<template>
  <!--导航面包屑-->
  <div ref="topDiv">
    <el-breadcrumb class="breadcrumb" separator=">">
      <el-breadcrumb-item :to="{ path: '/epmsFrame/epmsDeliverConfig/epmsDeliveryConfigReview' }">待我审批 </el-breadcrumb-item>
      <el-breadcrumb-item>{{reviewForm.deliveryConfigNo}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="9">
      <el-col :span="6">
        <el-form ref="reviewForm" :model="reviewForm" label-position="left" :rules="rules">
          <el-form-item label="交付配置编号:" prop="deliveryConfigNo" style="margin-bottom:2px;">
            {{reviewForm.deliveryConfigNo}}
          </el-form-item>
          <el-form-item label="版本号:" prop="version" style="margin-bottom:2px;">
            {{reviewForm.version}}
          </el-form-item>
          <el-form-item label="创建人:" prop="createUser" style="margin-bottom:2px;">
            {{reviewForm.createUser}}
          </el-form-item>
          <el-form-item label="创建时间:" prop="createDate" style="margin-bottom:2px;">
            {{reviewForm.createDate}}
          </el-form-item>
          <el-form-item label="提交人:" prop="createUser" style="margin-bottom:2px;">
            {{reviewForm.createUser}}
          </el-form-item>
          <el-form-item label="评审结论:" prop="reviewResult" style="margin-bottom:2px;">
            <el-radio-group v-model="reviewForm.reviewResult">
              <el-radio class="radio" :label="1" :disabled="readOnly">通过</el-radio>
              <el-radio class="radio" :label="2" :disabled="readOnly">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="评审意见:" prop="reviewOpinions" style="margin-bottom:30px;" required:true>
            <el-input type="textarea" v-model="reviewForm.reviewOpinions" :rows="6" :disabled="readOnly" :maxlength="500" ></el-input>
          </el-form-item>
          <el-form-item style="margin-left:80px;">
            <el-button type="primary" @click="deliveryConfigAudit()" :disabled="submitDisabled" v-if="btnVisible">提交评审</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="18">
        <el-popover v-show="isShow" ref="businessModelConfigList" placement="bottom" transition="collapse-transition" :title="popoverTitle" width="1000" trigger="click">
          <div style="float: right;margin-top: -33px;" @click="isShow = false">
            <el-button type="text" class="el-dialog__headerbtn">
              <i class="el-dialog__close el-icon el-icon-close"></i>
            </el-button>
          </div>
          <!--G-Bom列表层-->
          <div ref="gBomTable" style="height:370px">
  
          </div>
        </el-popover>
        <div class="top-table" style="width:100%" ref="reTableTop">
        </div>
        </br>
  
      </el-col>
    </el-row>
  
  </div>
</template>


<script>
let tablePane = new ht.ui.TablePane();
let deliveryConfigReviewId = null;
let tablePaneGBom = new ht.ui.TablePane();

export default {
  name: 'epmsDeliveryConfigAudit',
  data() {
    var checkReviewOpinions = (rule, value, callback) => {
      if (this.reviewForm.reviewResult == 2) {
        if (!value) {
          return callback(new Error('评审意见不能为空！'));
        }
      }
      callback();
    }

    return {
      popoverTitle: '交付配置明细',
      reviewForm: {
        deliveryConfigReviewId: '',
        reviewObjectId: '',
        deliveryConfigNo: '',
        version: '',
        createUser: '',
        createDate: '',
        reviewResult: 0,
        reviewOpinions: ''
      },
      rules: {
        reviewOpinions: [
          { validator: checkReviewOpinions },
        ]
      },
      readOnly: true,
      btnVisible:false,
      submitDisabled: true,
      isShow: false
    };
  },
  watch: {
    reviewForm: {
      handler: function (val, oldVal) {
        if (this.submitDisabled) {
          if (!this.readOnly && !!val.reviewResult) {
            this.submitDisabled = false;
          }
        }
      },
      deep: true
    },
    '$store.state.isCollapse': function (val) {
      tablePane.setWidth(this.$refs.reTableTop.$el.clientWidth)
    }
  },
  methods: {

    //查询交付配置评审记录
    loadDeliverConfigReviewInfo(deliveryConfigReviewId) {
      this.$epmsDeliveryConfig(this, '00011', '/audits/' + deliveryConfigReviewId, 'GET').then(response => {
        this.loadDeliveryconfigAudit(response.data.bo);
      });
    },

    //加载交付配置评审记录
    loadDeliveryconfigAudit(bo) {
      if (bo != null) {
        this.reviewForm = bo;
        this.readOnly = bo.reviewResult > 0;
        this.btnVisible = bo.reviewResult == 0;
      }
    },

    //初始化成本区域业务模型关联关系表格
    initCostAreaBusinessModelRelationTable(bos) {
      let thiz = this;
      tablePane = new ht.ui.TablePane();
      let table = tablePane.getTableView();
      let tableHeader = tablePane.getTableHeader();
      let dataModel = table.getDataModel();
      let columnModel = table.getColumnModel();

      tablePane.setBorder(new ht.ui.border.CSSBorder(1, '#dfe6ec', 'solid'))
      tableHeader.setPreferredSize(0, 42);//设置表头的高，第一个宽无效
      tableHeader.setBackground('#eef1f6')

      let datas = bos;
      for (let i = 0; i < datas.length; i++) {
        let data = new ht.Data();
        data.a('num', i + 1);
        for (let key in datas[i]) {
          if (datas[i].hasOwnProperty(key)) {
            data.a(key, datas[i][key]);
          };
        }
        dataModel.add(data);
      }

      let column = null;
      column = new ht.ui.Column();
      column.setName('num');
      column.setDisplayName('序号');
      column.setAccessType('attr');
      column.setWidth(50);
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('costAreaName');
      column.setDisplayName('成本区域');
      column.setAccessType('attr');
      column.setWidth(200);
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('customName');
      column.setDisplayName('业务模型');
      column.setAccessType('attr');
      column.setWidth(200);
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('businessModelDimension');
      column.setAccessType('attr');
      column.setDisplayName('业务模型量纲');
      column.setWidth(150);
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('businessModelQuantity');
      column.setAccessType('attr');
      column.setDisplayName('业务模型数量');
      column.setWidth(150);
      columnModel.add(column);

      table.getSelectionModel().addSelectionChangeListener(function (e) {

      });

      table.onDataClicked = function (data, e) {
        thiz.isShow = true;
        thiz.$refs.businessModelConfigList.$refs.popper.style.display = 'block';
        thiz.$refs.businessModelConfigList.$refs.popper.style.position = 'fixed';
        thiz.$refs.businessModelConfigList.$refs.popper.style.bottom = '0px';
        thiz.$refs.businessModelConfigList.$refs.popper.style.width = thiz.$refs.reTableTop.clientWidth + "px";// thiz.$refs.tabs.$el.clientWidth+"px";
        let businessModelHeadId = data.a('businessModelHeadId')
        thiz.loadGBomList(businessModelHeadId);//'bda08f9c-1764-4b49-b89a-56c86dd43a44'
        thiz.businessModelHeadId = businessModelHeadId;
      };

      tablePane.addToDOM(thiz.$refs.reTableTop, {
        width: thiz.$refs.reTableTop.clientWidth, height: 970
      });

      setTimeout(function () {
        tablePane.setWidth(thiz.$refs.reTableTop.clientWidth)
      });
    },

    //加载成本区域业务模型关联关系数据
    LoadCostAreaBusinessModelRelation(deliveryConfigId) {
      this.$epmsDeliveryConfig(this, '00011', '/costarea/bizmodels/' + deliveryConfigId, 'GET').then(response => {
        this.initCostAreaBusinessModelRelationTable(response.data.bo);
      });
    },

    //加载GBom列表
    loadGBomList(businessModelHeadId) {
      let thiz = this;
      this.$epmsDeliveryConfig(this, '00011', '/bizmodel/gboms/' + businessModelHeadId + '/?language=zh_CN', 'GET').then(response => {
        thiz.changeGBomData(response.data.bo);
      });
    },

    changeGBomData(bo) {
      let table = tablePaneGBom.getTableView();
      let dataModel = table.getDataModel();
      dataModel.clear();
      let datas = bo;
      for (let i = 0; i < datas.length; i++) {
        let data = new ht.Data();
        data.a('num', i + 1);
        for (let key in datas[i]) {
          if (datas[i].hasOwnProperty(key)) {
            data.a(key, datas[i][key]);
          };
        }
        dataModel.add(data);
      }
    },

    //载入GBom的UI
    initGBomTableUi() {
      let thiz = this;
      tablePaneGBom = new ht.ui.TablePane();
      let table = tablePaneGBom.getTableView();
      let tableHeader = tablePaneGBom.getTableHeader();
      let dataModel = table.getDataModel();
      let columnModel = table.getColumnModel();

      tablePaneGBom.setBorder(new ht.ui.border.CSSBorder(1, '#dfe6ec', 'solid'))
      tableHeader.setPreferredSize(0, 42);//设置表头的高，第一个宽无效
      tableHeader.setBackground('#eef1f6')

      //tablePaneGBom.getTableView().setCheckMode(true); //设置有全选模式

      let column = null;
      column = new ht.ui.Column();
      column.setName('num');
      column.setDisplayName('序号');
      column.setAccessType('attr');
      column.setWidth(50);
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('workPackageCode');
      column.setDisplayName('工作包编码');
      column.setAccessType('attr');
      column.setWidth(150);
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('serviceProductFamilyName');
      column.setDisplayName('服务产品族');
      column.setAccessType('attr');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('serviceProductLayerName');
      column.setAccessType('attr');
      column.setDisplayName('服务产品');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('moduleName');
      column.setAccessType('attr');
      column.setDisplayName('交付模块');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('sceneName');
      column.setDisplayName('交付场景');
      column.setWidth(150);
      column.setAccessType('attr');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('workPackageName');
      column.setDisplayName('工作包');
      column.setWidth(150);
      column.setAccessType('attr');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('workPackageUnit');
      column.setDisplayName('量纲');
      column.setWidth(50);
      column.setAccessType('attr');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('workPackageIsoutsourcing');
      column.setDisplayName('外包属性');
      column.setWidth(80);
      column.formatValue = function (value) {
        return value === 1 ? '是' : '否';
      };
      column.setAccessType('attr');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('deliveryQuantity');
      column.setDisplayName('数量');
      column.setWidth(50);
      column.setAccessType('attr');
      column.setEditable(true);
      column.setEditorClass('ht.ui.editor.NumberEditor');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setName('remark');
      column.setDisplayName('备注');
      column.setWidth(150);
      column.setAccessType('attr');
      columnModel.add(column);

      column = new ht.ui.Column();
      column.setDisplayName('操作');
      column.setAccessType('attr');
      column.setWidth(200);
      columnModel.add(column);

      table.getSelectionModel().addSelectionChangeListener(function (e) {
        //e.preventdefault();
      });

      tablePaneGBom.addToDOM(thiz.$refs.gBomTable, { width: thiz.$refs.reTableTop.clientWidth - 22, height: 370 });
      setTimeout(function () {
        tablePaneGBom.setWidth(thiz.$refs.reTableTop.clientWidth - 22)
      });
    },

    //评审
    deliveryConfigAudit() {
      let thiz = this;
      debugger;
      thiz.$refs.reviewForm.validate((valid) => {
        debugger;
        if (valid) {
          thiz.$epmsDeliveryConfig(thiz, '00011', '/audits/approve', 'POST', thiz.reviewForm).then(response => {
            thiz.$message({
              message: response.body.code.msg,
              type: 'success',
              duration: 2000
            });
            //刷新数据
            thiz.loadDeliverConfigReviewInfo(thiz.deliveryConfigReviewId);
            thiz.readOnly = true;
            thiz.submitDisabled = true;
            //更新缓存
            let deliverConfigBo = thiz.$store.state.deliverConfigBo;
            deliverConfigBo.status = 3;
            thiz.$store.commit({
              type: 'setSeliverConfigBo',
              data: deliverConfigBo
            });
          });
        }
      });
    }
  },
  mounted() {
    this.deliveryConfigReviewId = this.$route.params.deliveryConfigReviewId;
    this.deliveryConfigId = this.$route.params.deliveryConfigId;
    //加载评审记录信息
    this.loadDeliverConfigReviewInfo(this.deliveryConfigReviewId);
    //加载成本区域业务模型关联关系
    this.LoadCostAreaBusinessModelRelation(this.deliveryConfigId);
    //初始化交付配置明细
    this.initGBomTableUi();
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

