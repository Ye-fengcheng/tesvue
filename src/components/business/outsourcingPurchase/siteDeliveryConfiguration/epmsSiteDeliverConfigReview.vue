<template>
  <div class="epmsSiteDeliverConfigInfo" >
    <!--tab选择-->
    <el-tabs ref="tabs" v-model="activeName" type="card" @tab-click="handleTabClick">
        <el-tab-pane label="站点交付配置基本信息" name="first"></el-tab-pane>
        <el-tab-pane label="站点交付配置评审" name="second"></el-tab-pane>
    </el-tabs>
    <!--站点交互配置头过滤-->
    <epmsPanel headText="交付配置审批" :hasHead="false" ref="panel">
      <el-form ref="form" slot="panelBody" label-position="right">
        <el-form-item label="评审状态:" style="margin-bottom:2px;">
          <el-radio-group v-model="reviewStatus" @change="reviewStatusChange">
            <el-radio class="radio" label="0">全部状态</el-radio>
            <el-radio class="radio" label="1">编辑中</el-radio>
            <el-radio class="radio" label="2">待评审</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </epmsPanel>
    <!--站点交互配置头列表操作栏-->
    <div>
        <el-button type="primary"  v-if="reviewStatus=='0' || reviewStatus=='1'" :disabled="siteReview">提交评审</el-button>
        <el-button  type="primary" v-if="reviewStatus=='0' || reviewStatus=='2'" :disabled="siteBack">撤回</el-button>
        <div style="float:right;width:40%">
            <el-input placeholder="逻辑站点名称" @change="searchTable"  v-model="searchKey">
                <el-button slot="append" icon="search" ></el-button>
            </el-input>
        </div>
    </div>
    <br/>
    <!-- 站点交付配置头列表 -->
    <div ref="recordsTable" style="height:300px;">

    </div>  

    <!--tab选择-->
    <el-tabs ref="tabs" v-model="detailActiveName" type="card">
        <el-tab-pane label="评审记录" name="first">
            <!-- 站点交付配置评审记录列表 -->
            <div ref="reviewTable" style="height:300px;">
            </div> 
        </el-tab-pane>
        <el-tab-pane label="配置明细" name="second">
            <!-- 站点交付配置明细列表 -->
            <div ref="detailTable" style="height:300px;">
            </div> 
        </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
  let tablePane = new ht.ui.TablePane();
  let tablePaneReview = new ht.ui.TablePane();
  let tablePaneDetail = new ht.ui.TablePane();
  export default {
    data() {
      return {
          detailActiveName:'first',
          activeName:'second',
          //撤回按钮不可用
          siteBack:true,
          //提交评审按钮不可用
          siteReview:true,
          //搜索站点关键字
          searchKey:'',
          //评审状态
          reviewStatus:'1'
      };
    },
    watch:{
        '$store.state.isCollapse': function(val){
            tablePane.setWidth(this.$refs.tabs.$el.clientWidth)
            tablePaneReview.setWidth(this.$refs.tabs.$el.clientWidth)
            tablePaneDetail.setWidth(this.$refs.tabs.$el.clientWidth)
        }
    },    
    methods: {
        //物理站点搜索
        remoteMethod(query) {

        },
        //切换评审状态
        reviewStatusChange(val){
            console.log(val);
        },
        //tab切换
        handleTabClick(tab, event){
            switch(tab.name){
                case "first" :
                    this.$router.push({ path : '/epmsFrame/epmsSiteDeliverConfig/epmsSiteDeliverConfigInfo'})
                break;
            }
        },
        searchTable(){

        },
        //站点交付配置列表UI
        initSiteTableUi(){
            let thiz = this;
            tablePane = new ht.ui.TablePane();
            let table = tablePane.getTableView();
            let tableHeader = tablePane.getTableHeader();
            let dataModel = table.getDataModel();
            let columnModel = table.getColumnModel();
            
            tablePane.setBorder(new ht.ui.border.CSSBorder(1, '#dfe6ec', 'solid'))
            tableHeader.setPreferredSize(0,42);//设置表头的高，第一个宽无效
            tableHeader.setBackground('#eef1f6')

            tablePane.getTableView().setCheckMode(true); //设置有全选模式

            let column = null;
            column = new ht.ui.Column();
            column.setName('num');
            column.setDisplayName('序号');
            column.setAccessType('attr');
            column.setWidth(50);
            columnModel.add(column);    

            column = new ht.ui.Column();
            column.setName('businessModelHeadNo');
            column.setDisplayName('站点业务模型');
            column.setAccessType('attr');
            column.setWidth(150);
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('businessTypeNameCn');
            column.setDisplayName('成本区域');
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('networkTypeNameCn');
            column.setAccessType('attr');
            column.setDisplayName('物理站点名称');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('productCategoryNameCn');
            column.setAccessType('attr');
            column.setDisplayName('逻辑站点编号');
            columnModel.add(column);            

            column = new ht.ui.Column();
            column.setName('customName');
            column.setDisplayName('逻辑站点名称');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('businessModelDimension');
            column.setDisplayName('GBOM数量');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('businessModelDimension');
            column.setDisplayName('当前版本');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('businessModelDimension');
            column.setDisplayName('评审结论');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('remark');
            column.setDisplayName('状态');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setDisplayName('操作');
            column.setAccessType('attr');
            column.setWidth(500);
            columnModel.add(column);

            table.getSelectionModel().addSelectionChangeListener(function(e){
                debugger
                thiz.siteReview = table.getSelectionModel().isEmpty();
                thiz.siteBack = table.getSelectionModel().isEmpty(); 
            });
            table.onDataClicked = function(data, e){
                if(e.offsetX<40){
                    return false;
                }
                thiz.initSiteReviewTable();
            };
            tablePane.addToDOM(this.$refs.recordsTable,{width: this.$refs.tabs.$el.clientWidth,height:280});
            setTimeout(function(){
                tablePane.setWidth(thiz.$refs.tabs.$el.clientWidth)
            });
        },
        changeDataModel(tablePaneObject,bo){
            let table = tablePaneObject.getTableView();
            let dataModel = table.getDataModel();
            dataModel.clear();
            let datas = bo;
            for (let i = 0; i < datas.length; i++) {
                let data = new ht.Data();
                data.a('num',i+1);
                for(let key in datas[i]){
                    if (datas[i].hasOwnProperty(key)) {
                        data.a(key,datas[i][key]);
                    };
                }
                dataModel.add(data);
            }
        },
        //站点交付配置评审列表UI
        initSiteReviewTableUi(){
            let thiz = this;
            tablePaneReview = new ht.ui.TablePane();
            let table = tablePaneReview.getTableView();
            let tableHeader = tablePaneReview.getTableHeader();
            let dataModel = table.getDataModel();
            let columnModel = table.getColumnModel();
            
            tablePaneReview.setBorder(new ht.ui.border.CSSBorder(1, '#dfe6ec', 'solid'))
            tableHeader.setPreferredSize(0,42);//设置表头的高，第一个宽无效
            tableHeader.setBackground('#eef1f6')

            let column = null;
            column = new ht.ui.Column();
            column.setName('num');
            column.setDisplayName('序号');
            column.setAccessType('attr');
            column.setWidth(50);
            columnModel.add(column);    

            column = new ht.ui.Column();
            column.setName('businessModelHeadNo');
            column.setDisplayName('版本');
            column.setAccessType('attr');
            column.setWidth(150);
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('businessTypeNameCn');
            column.setDisplayName('提交人');
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('networkTypeNameCn');
            column.setAccessType('attr');
            column.setDisplayName('提交时间');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('productCategoryNameCn');
            column.setAccessType('attr');
            column.setDisplayName('评审人');
            columnModel.add(column);            

            column = new ht.ui.Column();
            column.setName('customName');
            column.setDisplayName('评审日期');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('businessModelDimension');
            column.setDisplayName('评审结论');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('businessModelDimension');
            column.setDisplayName('评审意见');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('businessModelDimension');
            column.setDisplayName('评审状态');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            table.onDataClicked = function(data, e){
                
            };
            tablePaneReview.addToDOM(this.$refs.reviewTable,{width: this.$refs.tabs.$el.clientWidth,height:280});
            setTimeout(function(){
                tablePaneReview.setWidth(thiz.$refs.tabs.$el.clientWidth)
            });
        },
        //站点交付配置明细列表UI
        initSiteDetailTableUi(){
            let thiz = this;
            tablePaneDetail = new ht.ui.TablePane();
            let table = tablePaneDetail.getTableView();
            let tableHeader = tablePaneDetail.getTableHeader();
            let dataModel = table.getDataModel();
            let columnModel = table.getColumnModel();
            
            tablePaneDetail.setBorder(new ht.ui.border.CSSBorder(1, '#dfe6ec', 'solid'))
            tableHeader.setPreferredSize(0,42);//设置表头的高，第一个宽无效
            tableHeader.setBackground('#eef1f6')

            let column = null;
            column = new ht.ui.Column();
            column.setName('num');
            column.setDisplayName('序号');
            column.setAccessType('attr');
            column.setWidth(50);
            columnModel.add(column);    

            column = new ht.ui.Column();
            column.setName('businessModelHeadNo');
            column.setDisplayName('控制账号');
            column.setAccessType('attr');
            column.setWidth(150);
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('businessTypeNameCn');
            column.setDisplayName('销售订单号');
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('networkTypeNameCn');
            column.setAccessType('attr');
            column.setDisplayName('工作包代码');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('productCategoryNameCn');
            column.setAccessType('attr');
            column.setDisplayName('服务产品族');
            columnModel.add(column);            

            column = new ht.ui.Column();
            column.setName('customName');
            column.setDisplayName('服务产品层');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('businessModelDimension');
            column.setDisplayName('交付模块');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('businessModelDimension');
            column.setDisplayName('交付场景');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('businessModelDimension');
            column.setDisplayName('工作包');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('remark');
            column.setDisplayName('量纲');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('remark');
            column.setDisplayName('是否打包');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('remark');
            column.setDisplayName('外包属性');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('remark');
            column.setDisplayName('数量');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('remark');
            column.setDisplayName('PR数量');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            table.onDataClicked = function(data, e){
                
            };
            tablePaneDetail.addToDOM(this.$refs.detailTable,{width: this.$refs.tabs.$el.clientWidth,height:280});
            setTimeout(function(){
                tablePaneDetail.setWidth(thiz.$refs.tabs.$el.clientWidth)
            });
        }       
    },
    mounted () {
        this.initSiteTableUi();
        this.initSiteReviewTableUi();
        this.initSiteDetailTableUi();
    },
    destroyed (){
        tablePaneDetail.removeFromDOM();
        tablePaneReview.removeFromDOM();
        tablePane.removeFromDOM();
    }
  };
</script>

<style scoped>
.popover{
    position: fixed;
    bottom: 0px;
    height: 500px;
}
.grid-right{
    float: right;
}
.grid-left{
    width: 100%
}
</style>