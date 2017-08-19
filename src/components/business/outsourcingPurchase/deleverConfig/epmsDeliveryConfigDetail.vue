<template>
  <!--导航面包屑-->
  <div >
    <div ref="tabs">
      <el-breadcrumb  class="breadcrumb" separator=">">
        <el-breadcrumb-item :to="{ path: '/epmsFrame/epmsDeliverConfig/epmsDeliverConfig/'+ $store.state.deliverConfigBo.projId }">交付配置 </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/epmsFrame/epmsDeliverConfig/epmsCommitReview' }">提交评审</el-breadcrumb-item>
        <el-breadcrumb-item >{{$store.state.deliverConfigBo.deliveryConfigNo}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row >
      <el-col :span="24">
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
        <div class="top-table" style="height:650px" ref="reTableTop">
        </div>
        </br>
      </el-col>
    </el-row>
  </div>
</template>


<script>
let tablePane = null;
let deliveryConfigReviewId = null;
let tablePaneGBom = new ht.ui.TablePane();

export default {
  name: 'epmsDeliveryConfigAudit',
  data() {
    return {
      // reviewResult: 0,
      popoverTitle: '交付配置明细',
      readOnly: true,
      submitDisabled: true,
      isShow: false
    };
  },
  watch: {
    // 'reviewResult': function (val) {
    //   this.reviewForm.reviewResult = val;
    //   if (!!val && !this.readOnly)
    //     this.submitDisabled = false;
    // },
    '$store.state.isCollapse': function (val) {
      debugger
      tablePane.setWidth(this.$refs.tabs.clientWidth)
      tablePaneGBom.setWidth(this.$refs.reTableTop.clientWidth - 22)
    }
  },
  methods: {


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
        width: thiz.$refs.tabs.clientWidth, height: 970
      });

      setTimeout(function () {
        tablePane.setWidth(thiz.$refs.tabs.clientWidth)
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
    }
  },
  mounted() {
    this.deliveryConfigId = this.$route.params.deliveryConfigId;
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

