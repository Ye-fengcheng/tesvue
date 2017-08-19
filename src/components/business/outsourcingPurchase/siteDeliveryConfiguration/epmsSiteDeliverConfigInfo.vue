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
          <el-radio-group v-model="reviewStatus">
            <el-radio class="radio" label="0">全部状态</el-radio>
            <el-radio class="radio" label="1">待评审</el-radio>
            <el-radio class="radio" label="2">评审中</el-radio>
            <el-radio class="radio" label="3">已生效</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </epmsPanel>
    <!--站点交互配置头列表操作栏-->
    <div>
        <el-button type="primary" icon="plus"  @click="addSiteDeliverConfig">新增站点交付配置</el-button>
        <el-button  type="primary" :disabled="siteCopy" @click="copySiteDeliverConfig"><span class="glyphicon glyphicon-copy"></span>&nbsp;&nbsp;复制到目标站点</el-button>
        <el-button type="danger" icon="delete2" :disabled="siteDelete" >删除</el-button>
        <div style="float:right;width:40%">
            <el-input placeholder="逻辑站点名称" @change="searchTable('tablePane',searchKey)"  v-model="searchKey">
                <el-button slot="append" icon="search" ></el-button>
            </el-input>
        </div>
    </div>
    <br/>
    <!-- 站点交付配置头列表 -->
    <div ref="recordsTable">

    </div>  
    <!--交付明细弹出层-->
    <el-popover
        v-show="isShow"
        ref="siteDetaiList"
        placement="bottom"
        transition="collapse-transition"
        :title="popoverTitle"
        trigger="click">
        <div style="float: right;margin-top: -33px;" @click="isShow = false"><el-button type="text" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></el-button></div>
        <br/>
        <!--交付明细弹列表层-->
        <div ref="siteDetaiTable" style="height:480px">
           
        </div> 
    </el-popover>
    <!--添加站点交付配置头层-->
    <el-dialog size="large" top="2%" title="新增站点交付配置" :visible.sync="addSiteFormVisible">
        <!--新增站点交付明细头-->
        <div ref="detailHeader">
            <el-row>
                <el-col :span="12">
                    <div class="grid-left">
                        <el-select v-model="siteModel" placeholder="请选择站点业务模型">
                            <el-option
                            v-for="item in siteModelData"
                            :key="item.scopId"
                            :label="item.scopName"
                            :value="item.scopId">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div >
                        <el-button class="grid-right" @click="searchModelTable" style="margin-left:5px" type="primary">搜索</el-button>
                        <el-select 
                            class="grid-right"
                            v-model="physicsSiteKey"
                            filterable
                            placeholder="物理站点名称"
                            :loading="loading">
                            <el-option
                            v-for="item in physicsSiteData"
                            :key="item.siteId"
                            :label="item.siteName"
                            :value="item.siteId">
                            </el-option>
                        </el-select>                        
                    </div>
                </el-col>
            </el-row>            
        </div>
        <br/>
        <!--站点业务模型列表层-->
        <div ref="modelTable" style="height:250px">
           
        </div>
        <br/>
        <div>
            设置默认销售订单号：
            <el-select 
                v-model="saleKey"
                filterable
                placeholder="销售订单">
                <el-option
                v-for="item in saleData"
                :key="item.contractId"
                :label="item.contractNo"
                :value="item.contractId">
                </el-option>
            </el-select>
            <el-button style="margin-left:10px" :disabled="!saleKey || saleOederIsEmpty" type="primary">设置</el-button>  
        </div>
        <br/>
        <!--销售订单列表层-->
        <div ref="saleOrderTable" style="height:250px">
           
        </div>
        <br/>
        <div>
            <el-row>
                <el-col :span="24">
                    <div >
                        <el-button class="grid-right" @click="addSiteFormVisible= false" style="margin-left:5px" >取消</el-button>
                        <el-button class="grid-right" type="primary">确定</el-button>                   
                    </div>
                </el-col>
            </el-row>            
        </div>
    </el-dialog>
    <!--复制到目标站点层-->
    <el-dialog  top="2%" title="复制到目标站点" :visible.sync="copySiteFormVisible">
        <!--新增站点交付明细头-->
        <div ref="copyModelHeader">
            <el-row>
                <el-col :span="24">
                    <div  class="grid-right">
                        <el-input placeholder="逻辑站点名称" @change="searchTable('tablePaneSiteCopy',copySearchKey)"  v-model="copySearchKey">
                             <el-button slot="append" icon="search" ></el-button>
                        </el-input>                                             
                    </div>
                </el-col>
            </el-row>            
        </div>
        <br/>
        <!--站点业务模型列表层-->
        <div ref="copyModelTable" style="height:250px">
           
        </div>
        <br/>
        <div>
            <el-row>
                <el-col :span="10">
                    已选逻辑站点数量：{{num}}
                </el-col>
                <el-col :span="14">
                    <el-button type="primary" @click="copyDataDown" :disabled="dataDown" icon="arrow-down"></el-button>
                    <el-button type="primary" @click="copyDataUp" :disabled="dataUp" icon="arrow-up"></el-button>
                </el-col>
            </el-row>               
        </div>
        <br/>
        <!--销售订单列表层-->
        <div ref="copyModelTableTwo" style="height:250px">
           
        </div>
        <br/>
        <div>
            <el-row>
                <el-col :span="24">
                    <div>
                        <el-button class="grid-right" @click="copySiteFormVisible= false" style="margin-left:10px" >取消</el-button>
                        <el-button class="grid-right" type="primary">确定</el-button>                   
                    </div>
                </el-col>
            </el-row>            
        </div>
    </el-dialog>   
  </div>
</template>
<script>
  let tablePane = new ht.ui.TablePane();
  let tablePaneDetail = new ht.ui.TablePane();
  let tablePaneModel = new ht.ui.TablePane();
  let tablePaneSale = new ht.ui.TablePane();
  let tablePaneSiteCopy = new ht.ui.TablePane();
  let tablePaneSiteCopyTwo = new ht.ui.TablePane();
  export default {
    data() {
      return {
          physicsSiteKey:'',
          physicsSiteData:[],
          siteModelData:[],
          saleKey:'',
          saleData:[],
          siteModel:'',
          loading: false,
          isShow:false,
          dataDown:true,
          dataUp:true,
          popoverTitle:'站点交付配置明细',
          copySearchKey:'',
          activeName:'first',
          //添加站点交付配置modal框是否可用
          addSiteFormVisible : false,
          //复制站点交付配置modal是否可用
          copySiteFormVisible :false,
          //复制到目标站点按钮不可用
          siteCopy:true,
          //站点删除按钮不可用
          siteDelete:true,
          //搜索站点关键字
          searchKey:'',
          //评审状态
          reviewStatus:'0',
          //销售订单是否为空
          saleOederIsEmpty:true,
          //已选逻辑站点数量
          num:0
      };
    },
    watch:{
        '$store.state.isCollapse': function(val){
            tablePane.setWidth(this.$refs.tabs.$el.clientWidth)
        },
        'siteModel': function(val){
            this.siteModelChange(val);
        },
        'reviewStatus': function(val){
            this.reviewStatusChange(val);
        }
    }, 
    methods: {
        //搜索新增站点交付配置的业务模型列表
        searchModelTable(){
            debugger
            if(!this.physicsSiteKey){
                return false;
            }
            let thiz = this;
            thiz.$epmsDeliveryConfig(thiz, '00011', '/preSiteDeliveryConfigs?siteId=88792CB5-B747-435D-89A8-0033A3F9A6D3', 'GET',{},null,'siteDeliveryConfigs').then(response => {
               thiz.changeDataModel(tablePaneModel,response.data.bo);
            });
            thiz.$epmsDeliveryConfig(thiz, '00011', '/preSiteDeliveryDetails?siteId=7D8BF780-2046-4190-AB46-C37CB466D16D', 'GET',{},null,'siteDeliveryConfigDetails').then(response => {
               debugger;
               thiz.changeDataModel(tablePaneSale,response.data.bo);
            });
        },
        //加载销售订单的数据
        loadSaleOrderDatas(){
            debugger
            let thiz = this;
            thiz.$epmsDeliveryConfig(thiz, '00011', '/5FC1600A-463A-4FF0-A6FB-7223578530D0', 'GET',{},null,'salesOrders').then(response => {
               debugger;
               thiz.saleData = response.data.bo;
            });
        },
        //复制站点业务模型列表下移
        copyDataDown(){
            let table = tablePaneSiteCopy.getTableView();
            let datas = [];
            table.getSelectionModel().each(item=>{
                datas.push(item);    
            })
            this.siteDeliverConfigMove(tablePaneSiteCopy,tablePaneSiteCopyTwo,datas)                    
        },
        //复制站点业务模型列表上移
        copyDataUp(){
            let tableTwo = tablePaneSiteCopyTwo.getTableView();
            let datas = [];
            tableTwo.getSelectionModel().each(item=>{
                datas.push(item);    
            })
            this.siteDeliverConfigMove(tablePaneSiteCopyTwo,tablePaneSiteCopy,datas)
        },
        //表格行数据移动
        siteDeliverConfigMove(from,to,datas){
            let table = from.getTableView();
            let dataModel = table.getDataModel();
            let tableTo = to.getTableView();
            let dataModelTo = tableTo.getDataModel();
            let removeItems = [];
            datas.map(item=>{
                removeItems.push(item);     
                let data = new ht.Data();
                for(let key in item.getAttrObject()){
                    data.a(key,item.getAttrObject()[key]);
                }
                data.a('num',dataModelTo.size()+1)
                dataModelTo.add(data);
            })
            removeItems.map(item=>{
                dataModel.remove(item); 
            });
            //更新已选逻辑站点数量
            this.num =  tablePaneSiteCopyTwo.getTableView().getDataModel().size(); 
        },
        //打开复制站点交付配置窗口
        copySiteDeliverConfig(){
            let thiz = this;
            this.copySiteFormVisible = true;
            setTimeout(function(){
                thiz.initSiteCopyTableUi();
                thiz.initSiteCopyTwoTableUi();
                thiz.changeDataModel(tablePaneSiteCopy,[{businessModelHeadNo:'test'},{businessModelHeadNo:'mmmm'}]);
            }) 
        },
        //打开新增站点交付配置窗口
        addSiteDeliverConfig(){
            let thiz = this;
            this.addSiteFormVisible = true;
            setTimeout(function(){
                thiz.initModelTableUi();
                thiz.initSaleTableUi();
            });
            thiz.loadSaleOrderDatas();            
        },
        //站点业务模型下拉框数据源
        initSiteBizModel() {
            let thiz = this;
            thiz.$epmsDeliveryConfig(thiz, '00011', '/EE97D090-E482-4E36-8204-0A7947D505B0', 'GET',{},null,'siteBizModels').then(response => {//, { headers: { projectId: thiz.$store.state.deliverConfigBo.projId } }
               thiz.siteModelData = response.data.bo;
            });
        },
        //站点业务模型下拉框事件  加载物理站点数据
        siteModelChange(val) {
            if(!val) {
                return;
            }
            let thiz = this;
            thiz.$epmsDeliveryConfig(thiz, '00011', '/' + val, 'GET',{},null,'sites').then(response => {//, { headers: { projectId: thiz.$store.state.deliverConfigBo.projId } }
               thiz.physicsSiteData = response.data.bo;
            });
        },
        //切换评审状态
        reviewStatusChange(val){
            console.log(val);
        },
        //tab切换
        handleTabClick(tab, event){
            switch(tab.name){
                case "second" :
                    this.$router.push({ path : '/epmsFrame/epmsSiteDeliverConfig/epmsSiteDeliverConfigReview'})
                break;
            }
        },
        searchTable(tableName,key){
            let thiz = this;
            switch(tableName){
                case 'tablePane':
                    tablePane.getTableView().setVisibleFunc(function(data){
                        if(data.a('businessModelHeadNo').indexOf(key)>=0)
                            return true
                    });
                break;
                case 'tablePaneSiteCopy':
                debugger
                    tablePaneSiteCopy.getTableView().setVisibleFunc(function(data){
                        if(data.a('businessModelHeadNo').indexOf(key)>=0)
                            return true
                    });
                break;
            }
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
                thiz.siteCopy = table.getSelectionModel().isEmpty() || table.getSelectionModel().size() > 1;
                thiz.siteDelete = table.getSelectionModel().isEmpty(); 
            });
            table.onDataClicked = function(data, e){
                if(e.offsetX<40){
                    return false;
                }
                thiz.isShow = true;
                thiz.$refs.siteDetaiList.$refs.popper.style.display = 'block';
                thiz.$refs.siteDetaiList.$refs.popper.style.position = 'fixed';
                thiz.$refs.siteDetaiList.$refs.popper.style.bottom = '0px';
                thiz.$refs.siteDetaiList.$refs.popper.style.width = thiz.$refs.tabs.$el.clientWidth+"px";

            };
            tablePane.addToDOM(this.$refs.recordsTable,{width: this.$refs.tabs.$el.clientWidth,height:480});
            setTimeout(function(){
                tablePane.setWidth(thiz.$refs.tabs.$el.clientWidth)
            });
        },
        changeDataModel(tablePaneObject,bo){
            let table = tablePaneObject.getTableView();
            let dataModel = table.getDataModel();
            let datas = bo;
            dataModel.clear();
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

            tablePaneDetail.getTableView().setCheckMode(true); //设置有全选模式

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
            });
            table.onDataClicked = function(data, e){
            };
            tablePaneDetail.addToDOM(this.$refs.siteDetaiTable,{width: this.$refs.tabs.$el.clientWidth-30,height:480});
            setTimeout(function(){
                tablePaneDetail.setWidth(thiz.$refs.tabs.$el.clientWidth-30)
            });
        },   
        //站点交付配置列表UI
        initModelTableUi(){
            let thiz = this;
            tablePaneModel = new ht.ui.TablePane();
            let table = tablePaneModel.getTableView();
            let tableHeader = tablePaneModel.getTableHeader();
            let dataModel = table.getDataModel();
            let columnModel = table.getColumnModel();
            
            tablePaneModel.setBorder(new ht.ui.border.CSSBorder(1, '#dfe6ec', 'solid'))
            tableHeader.setPreferredSize(0,42);//设置表头的高，第一个宽无效
            tableHeader.setBackground('#eef1f6')

            //tablePaneModel.getTableView().setCheckMode(true); //设置有全选模式

            let column = null;
            column = new ht.ui.Column();
            column.setName('num');
            column.setDisplayName('序号');
            column.setAccessType('attr');
            column.setWidth(50);
            columnModel.add(column);    

            column = new ht.ui.Column();
            column.setName('scopeName');
            column.setDisplayName('站点业务模型');
            column.setAccessType('attr');
            column.setWidth(120);
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('ccgCostAreaName');
            column.setDisplayName('成本区域');
            column.setWidth(120);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('siteName');
            column.setAccessType('attr');
            column.setDisplayName('物理站点名称');
            column.setWidth(150);
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('buildingCode');
            column.setAccessType('attr');
            column.setDisplayName('逻辑站点编号');
            column.setWidth(150);
            columnModel.add(column);            

            column = new ht.ui.Column();
            column.setName('buildingName');
            column.setDisplayName('逻辑站点名称');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);
             
            column = new ht.ui.Column();
            column.setName('accountName');
            column.setDisplayName('控制账号');
            column.setWidth(300);
            column.setAccessType('attr');
            columnModel.add(column); 

            column = new ht.ui.Column();
            column.setName('gBomNum');
            column.setDisplayName('GBOM数量');
            column.setWidth(350);
            column.formatValue = function (value) {
                return '0';
            };
            column.setAccessType('attr');
            columnModel.add(column);


            table.onDataClicked = function(data, e){
            };
            
            tablePaneModel.addToDOM(this.$refs.modelTable,{width: this.$refs.detailHeader.clientWidth,height:250});
        },
        //站点交付配置销售订单列表UI
        initSaleTableUi(){
            let thiz = this;
            tablePaneSale = new ht.ui.TablePane();
            let table = tablePaneSale.getTableView();
            let tableHeader = tablePaneSale.getTableHeader();
            let dataModel = table.getDataModel();
            let columnModel = table.getColumnModel();
            
            tablePaneSale.setBorder(new ht.ui.border.CSSBorder(1, '#dfe6ec', 'solid'))
            tableHeader.setPreferredSize(0,42);//设置表头的高，第一个宽无效
            tableHeader.setBackground('#eef1f6')

            tablePaneSale.getTableView().setCheckMode(true); //设置有全选模式

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
                thiz.saleOederIsEmpty = table.getSelectionModel().isEmpty();
            });
            tablePaneSale.addToDOM(this.$refs.saleOrderTable,{width: this.$refs.detailHeader.clientWidth,height:250});
        },
        //复制站点交付配置列表UI
        initSiteCopyTableUi(){
            let thiz = this;
            tablePaneSiteCopy = new ht.ui.TablePane();
            let table = tablePaneSiteCopy.getTableView();
            let tableHeader = tablePaneSiteCopy.getTableHeader();
            let dataModel = table.getDataModel();
            let columnModel = table.getColumnModel();
            
            tablePaneSiteCopy.setBorder(new ht.ui.border.CSSBorder(1, '#dfe6ec', 'solid'))
            tableHeader.setPreferredSize(0,42);//设置表头的高，第一个宽无效
            tableHeader.setBackground('#eef1f6')

            tablePaneSiteCopy.getTableView().setCheckMode(true); //设置有全选模式

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

            table.getSelectionModel().addSelectionChangeListener(function(e){
                thiz.dataDown = table.getSelectionModel().isEmpty(); 
            });

            table.onDataDoubleClicked= function(data, e){
                thiz.siteDeliverConfigMove(tablePaneSiteCopy,tablePaneSiteCopyTwo,[data]);
            };
            tablePaneSiteCopy.addToDOM(this.$refs.copyModelTable,{width: this.$refs.copyModelHeader.clientWidth,height:250});
        },
        //复制站点交付配置已选列表UI
        initSiteCopyTwoTableUi(){
            let thiz = this;
            tablePaneSiteCopyTwo = new ht.ui.TablePane();
            let table = tablePaneSiteCopyTwo.getTableView();
            let tableHeader = tablePaneSiteCopyTwo.getTableHeader();
            let dataModel = table.getDataModel();
            let columnModel = table.getColumnModel();
            
            tablePaneSiteCopyTwo.setBorder(new ht.ui.border.CSSBorder(1, '#dfe6ec', 'solid'))
            tableHeader.setPreferredSize(0,42);//设置表头的高，第一个宽无效
            tableHeader.setBackground('#eef1f6')

            tablePaneSiteCopyTwo.getTableView().setCheckMode(true); //设置有全选模式

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

            table.getSelectionModel().addSelectionChangeListener(function(e){
                thiz.dataUp = table.getSelectionModel().isEmpty(); 
            });
            table.onDataDoubleClicked= function(data, e){
                thiz.siteDeliverConfigMove(tablePaneSiteCopyTwo,tablePaneSiteCopy,[data]);
            };
            tablePaneSiteCopyTwo.addToDOM(this.$refs.copyModelTableTwo,{width: this.$refs.copyModelHeader.clientWidth,height:250});
        }
    },
    mounted () {
        this.initSiteTableUi();
        this.initSiteDetailTableUi();
        this.initSiteBizModel();//站点业务模型下拉框数据源
        this.changeDataModel(tablePane,[{businessModelHeadNo:'test'},{businessModelHeadNo:'mmmm'}])
    },
    destroyed (){
        tablePane.removeFromDOM();
        tablePaneDetail.removeFromDOM();
        tablePaneModel.removeFromDOM();
        tablePaneSale.removeFromDOM();
        tablePaneSiteCopy.removeFromDOM();
        tablePaneSiteCopyTwo.removeFromDOM();
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