<template>
  <div ref="topDiv">
    <epmsPanel headText="交付配置审批" ref="panel">
      <el-form ref="form" slot="panelBody" label-position="right">
        <el-form-item label="评审状态:" style="margin-bottom:2px;">
          <el-radio-group v-model="reviewStatus" @change="reviewStatusChange">
            <el-radio class="radio" label="0">全部状态</el-radio>
            <el-radio class="radio" label="1">待评审</el-radio>
            <el-radio class="radio" label="2">评审中</el-radio>
            <el-radio class="radio" label="3">已生效</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="评审结论:" style="margin-bottom:2px;">
          <el-radio-group @change="reviewResultChange" v-model="reviewResult" visable="">
            <el-radio class="radio" :disabled="resultDisable" label="0">全部结论</el-radio>
            <el-radio class="radio" :disabled="resultDisable" label="1">通&nbsp;&nbsp;&nbsp;过</el-radio>
            <el-radio class="radio" :disabled="resultDisable" label="2">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </epmsPanel>
    <div>
      <el-row>
        <el-col :span="24">
          <div style="float:right;width:40%">
            <el-row>
              <el-col :span="20">
                <el-input placeholder="交付配置编号" v-model="searchKey"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button @click="searchTable">查询</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <br/>
    <div ref="reTable">
  
    </div>
    </el-col>
    </el-row>
  
  </div>
</template>


<script>
let tablePane = null;
let reviewResultVisable = null;
let projId = null;
let deliveryConfigId = null;
let deliverConfigStatus = null;
export default {
  name: 'epmsDeliveryConfigAudit',
  data() {
    return {
      reviewResultVisable: true,
      searchKey: '',
      reviewStatus: '0',
      reviewResult: '0',
      resultDisable: false
    };
  },
  watch: {
    '$store.state.isCollapse': function (val) {
      tablePane.setWidth(this.$refs.panel.$el.clientWidth)
    }
  },
  methods: {
    //查询交付配置评审记录
    loadDeliverConfigAuditInfo(projId, deliveryConfigId) {
      this.$epmsDeliveryConfig(this, '00011', '/audits/' + projId + '/' + deliveryConfigId, 'GET').then(response => {
        this.loadDeliveryconfigAudits(response.data.bo);
      });
    },

    loadDeliveryconfigAudits(bos) {
      let thiz = this;
      let table = tablePane.getTableView();
      let dataModel = table.getDataModel();
      dataModel.clear();
      let datas = bos;
      for (let i = 0; i < datas.length; i++) {
        let data = new ht.Data();
        data.a('num', i + 1);
        data.a('deliveryConfigNo', this.$store.state.deliverConfigBo.deliveryConfigNo);
        for (let key in datas[i]) {
          if (datas[i].hasOwnProperty(key)) {
            data.a(key, datas[i][key]);
          };
        }
        data.a("deliveryConfigStatus", data.a("reviewResult") == 0 ? thiz.deliverConfigStatus : "3");
        dataModel.add(data);
      }
    },

    //加载交付配置评审记录
    initDeliveryconfigAuditsTable() {
      let thiz = this;
      tablePane = new ht.ui.TablePane();
      let table = tablePane.getTableView();
      let tableHeader = tablePane.getTableHeader();
      let columnModel = table.getColumnModel();

      tablePane.setBorder(new ht.ui.border.CSSBorder(1, '#dfe6ec', 'solid'))
      tableHeader.setPreferredSize(100, 42);//设置表头的高，第一个宽无效
      tableHeader.setBackground('#eef1f6')

      let column = new ht.ui.Column();
      column.setName('num');
      column.setDisplayName('序号');
      column.setAccessType('attr');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('deliveryConfigNo');
      column.setDisplayName('交付配置编号');
      column.setAccessType('attr');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('version');
      column.setDisplayName('版本号');
      column.setAccessType('attr');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('createUser');
      column.setAccessType('attr');
      column.setDisplayName('提交人');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('createDate');
      column.setAccessType('attr');
      column.setDisplayName('提交时间');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('updateDate');
      column.setDisplayName('审批时间');
      column.setAccessType('attr');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('reviewOpinions');
      column.setDisplayName('审批意见');
      column.setAccessType('attr');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('deliveryConfigStatus');
      column.setDisplayName('状态');
      column.setAccessType('attr');
      column.formatValue = function (value) {
        //0:未审批;1:通过;2:不通过;
        let text = '';
        if (value == "1") {
          text = '待评审';
        }
        else if (value == "2") {
          text = '评审中';
        }
        else if (value == "3") {
          text = "已生效";
        }
        return text;
      };
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('reviewResult');
      column.setId("reviewResult");
      column.setDisplayName('评审结论');
      column.setAccessType('attr');
      column.formatValue = function (value) {
        //0:未审批;1:通过;2:不通过;
        let text = '';
        if (value == 0)
          text = '';
        else if (value == 1)
          text = '通过';
        else if (value == 2)
          text = '不通过';
        return text;
      };
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setDisplayName('操作');
      column.setAccessType('attr');
      column.setWidth(200);
      columnModel.add(column);

      column.drawCell = function (g, data, selected, column, x, y, width, height) {
        let reviewResult = data.getAttr("reviewResult");
        let url = "";
        let btn = document.createElement("a");
        btn.type = "button";
        btn.setAttribute("class", "btn btn-link");
        let deliveryConfigReviewId = data.a("deliveryConfigReviewId");
        if (reviewResult == "0") {
          if (thiz.deliverConfigStatus == "1") {
            btn.innerHTML = "开始评审";
            btn.addEventListener('click', function (e) {
              thiz.beginAudit(thiz.deliveryConfigId);
            });
          }
          else if (thiz.deliverConfigStatus == "2") {
            btn.innerHTML = "进入评审";
            url = "/epmsFrame/epmsDeliverConfig/epmsDeliveryConfigReviewDetail/" + deliveryConfigReviewId + "/" + thiz.deliveryConfigId;
            btn.addEventListener('click', function (e) {
              thiz.$router.push(url);
            });
          }
        }
        else {
          btn.innerHTML = "查看";
          url = "/epmsFrame/epmsDeliverConfig/epmsDeliveryConfigReviewDetail/" + deliveryConfigReviewId + "/" + thiz.deliveryConfigId;
          btn.addEventListener('click', function (e) {
            thiz.$router.push(url);
          });
        }
        return btn;
      };
      tablePane.addToDOM(this.$refs.reTable, { width: this.$refs.panel.$el.clientWidth, height: 480 });
      setTimeout(function () {
        tablePane.setWidth(thiz.$refs.panel.$el.clientWidth)
      });
    },

    searchTable() {
      let thiz = this;
      let table = tablePane.getTableView();
      table.setVisibleFunc(function (data) {
        if (data.a("deliveryConfigNo").indexOf(thiz.searchKey) >= 0)
          return true;
      });
    },

    //审批状态单选按钮改变
    reviewStatusChange(radioValue) {
      let thiz = this;
      let table = tablePane.getTableView();
      let column = table.getColumnModel();
      let columnReviewResult = column.getDataById("reviewResult");
      debugger;
      table.setVisibleFunc(function (data) {
        switch (radioValue) {
          case "0":
            thiz.resultDisable = false;
            columnReviewResult.setVisible(true);
            if (thiz.reviewResult == "0") {
              return true;
            }
            else {
              if (data.a("reviewResult") == thiz.reviewResult) {
                return true;
              }
            }
            break;
          case "1":
            thiz.resultDisable = true;
            columnReviewResult.setVisible(false);
            if (data.a("deliveryConfigStatus") == "1") {
              return true;
            }
            break;
          case "2":
            thiz.resultDisable = true;
            columnReviewResult.setVisible(false);
            if (data.a("deliveryConfigStatus") == "2") {
              return true;
            }
            break;
          case "3":
            thiz.resultDisable = false;
            columnReviewResult.setVisible(true);
            if (thiz.reviewResult == "0") {
              if (data.a("deliveryConfigStatus") == "3") {
                return true;
              }
            }
            else {
              if (data.a("deliveryConfigStatus") == "3" && data.a("reviewResult") == thiz.reviewResult) {
                return true;
              }
            }
            break;
        }
      });
    },
    //审批结果单选按钮改变
    reviewResultChange(radioValue) {
      let thiz = this;
      let table = tablePane.getTableView();
      table.setVisibleFunc(function (data) {
        if (radioValue == "0") {
          if (thiz.reviewStatus == "2") {
            if (data.a("deliveryConfigStatus") == "3") {
              return true;
            }
          }
          else {
            return true;
          }
        }
        else {
          if (data.a("reviewResult") == radioValue)
            return true;
        }
      });
    },

    beginAudit(deliveryConfigId) {
      let thiz = this;
      thiz.$epmsDeliveryConfig(thiz, '00011', '/audits/begin/' + deliveryConfigId, 'POST').then(response => {
        //更新缓存
        let deliverConfigBo = thiz.$store.state.deliverConfigBo;
        deliverConfigBo.status = 2;
        thiz.deliverConfigStatus = 2;
        thiz.$store.commit({
          type: 'setSeliverConfigBo',
          data: deliverConfigBo
        });

        //弹出消息
        thiz.$message({
          showClose: true,
          message: response.body.code.msg,
          type: 'success',
          duration: 2000,
        });

        //刷新界面
        thiz.loadDeliverConfigAuditInfo(thiz.projId, thiz.deliveryConfigId);
      });
    }
  },
  mounted() {
    this.projId = this.$store.state.deliverConfigBo.projId;
    this.deliveryConfigId = this.$store.state.deliverConfigBo.deliveryConfigId;
    this.deliverConfigStatus = this.$store.state.deliverConfigBo.status;
    this.initDeliveryconfigAuditsTable();
    this.loadDeliverConfigAuditInfo(this.projId, this.deliveryConfigId);

  },
  destroyed() {
    tablePane.removeFromDOM();
  }
}
</script>

<style scoped>
.textCenter {
  text-align: center
}
</style>

