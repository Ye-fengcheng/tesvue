<template>
  <div class="epmsCreateBusinessModel" >
    <!--导航面包屑-->
    <el-breadcrumb class="breadcrumb" separator=">">
        <el-breadcrumb-item :to="{ path: '/epmsFrame/epmsDeliverConfig/epmsDeliverConfig/'+ $store.state.deliverConfigBo.projId }">交付配置 </el-breadcrumb-item>
        <el-breadcrumb-item>成本区域关联业务模型</el-breadcrumb-item>
    </el-breadcrumb>
    <!--tab选择-->
    <el-tabs ref="tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="制作业务模型" name="first"></el-tab-pane>
        <el-tab-pane label="成本区域关联业务模型" name="second"></el-tab-pane>
        <el-tab-pane label="提交评审" name="third"></el-tab-pane>
    </el-tabs>
    <!--业务模型列表操作栏-->
    <div>
        <el-button type="primary" icon="plus"  @click="addCostToBusinessModel">添加关联</el-button>
        <el-button type="danger" icon="delete2"  @click="delCostToBusinessModel" :disabled="costDelete">删除选中关联</el-button>
        <div style="float:right;width:40%">
            <el-input placeholder="成本区域名称/业务模型" @change="searchTable"  v-model="searchKey">
               <!--  <el-select class="select" v-model="selectType" slot="prepend" placeholder="请选择">
                    <el-option label="成本区域名称" value="costAreaName"></el-option>
                    <el-option label="业务模型" value="customName"></el-option>
                </el-select> -->
                <el-button slot="append" @click="searchTable" icon="search"></el-button>
            </el-input>
        </div>
    </div>
    <br/>
    <!-- 成本区域关联业务模型列表 -->
    <div ref="recordsTable" v-loading.body="areaListLoading" :element-loading-text="$t('business.common.loadingText')">

    </div>    
    <!--添加关联层-->
    <el-dialog title="添加关联" :visible.sync="addCostFormVisible">
        <el-steps :space="100" :active="active" :align-center="stepAlignCenter" space="200px" :center="stepCenter" finish-status="success">
            <el-step title="选择成本区域"></el-step>
            <el-step title="关联业务模型"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <br/>
        <el-row  v-show="active===1">
            <el-col :span="24" v-loading.body="treeLoading" :element-loading-text="$t('business.common.loadingText')">
                <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="areaKey">
                </el-input>
                <br/>
                <br/>
                <!--区域树-->
                <el-tree
                    :data="areaTreeData"
                    show-checkbox
                    :default-expand-all="treeExpandAll"
                    ref="araeTree"
                    :props="defaultProps"
                    :default-checked-keys="selectedList"
                    :filter-node-method="filterArea"
                    node-key="id">
                </el-tree>
            </el-col>
        </el-row>
        <el-row  v-show="active===2">
            <el-col :span="6">
                <el-menu mode="vertical" :default-active="defaultActive" class="el-menu-vertical-demo">
                    <el-menu-item-group title="已选成本区域：" >
                        <template v-for="item in selectAreList">
                            <el-menu-item :key="item.id" :index="item.id+''" class="hideBeyond">{{item.nameCn}}</el-menu-item>
                        </template>                        
                    </el-menu-item-group>
                </el-menu>
            </el-col>
            <el-col :span="18">
                <div class="right">
                    <div v-for="(item,ind) in areaBusinessModelData" :key="ind">
                        <h5>"{{item.area.nameCn}}"关联的业务模型：</h5>
                        <!--业务模型树-->
                        <el-input placeholder="输入关键字进行过滤" @change="changeSearchKey(ind,$event)">
                        </el-input>
                        <el-tree
                            :data="item.model"
                            show-checkbox
                            :ref="'areaBusinessModelTree'+ind"
                            :props="defaultPropsBusinessModel"
                            :default-checked-keys="selectedBusinessModelIdList"
                            :filter-node-method="filterBusinessModel"
                            node-key="businessModelHeadId">
                        </el-tree>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="next()" v-if="active===1">下一步</el-button> 
            <el-button type="primary" @click="finish()" v-if="active===2">确认添加</el-button>         
        </div>
    </el-dialog>
  </div>
</template>
<script>
  function randomColor() {
      let arrHex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
      let strHex = "#";
      let index;
      for (let i = 0; i < 6; i++) {
          index = Math.round(Math.random() * 15);
          strHex += arrHex[index];
      }
      return strHex;
  }
  let tablePane = new ht.ui.TablePane();
  export default {
    data() {
      return {
          areaListLoading:true,
          treeLoading:true,
          areaKey:'',
          businessModelKey:'',
          defaultActive:'',
          treeExpandAll:true,
          stepAlignCenter:true,
          stepCenter:true,
          //成本关联业务模型表格索引
          costTableIndex:0,
          //选择的区域ID
          selectedList:[],
          //选择区域的List
          selectAreList:[],
          activeName: 'second',
          //添加关联步骤
          active:1,
          //关联删除按钮不可用
          costDelete:true,
          //添加成本表单是否可用
          addCostFormVisible:false,
          //搜索类型
          selectType: 'costAreaName',
          //搜索关键字
          searchKey: '',
          areaTreeData: [],
          modelAreaRelation: [],
          defaultProps: {
            children: 'nodes',
            label: 'nameCn',
            disabled:'disabled'
          },
          businessModelData:[],
          areaBusinessModelData:[],
          defaultPropsBusinessModel:{
            children: 'nodes',
            label: 'customName',
            disabled:'disabled'
          },
          selectedBusinessModelIdList:[],
          selectedBusinessModelList:[]
      };
    },
    watch:{
        '$store.state.isCollapse': function(val){
            tablePane.setWidth(this.$refs.tabs.$el.clientWidth)
        },
        areaKey(val) {
            this.$refs.araeTree.filter(val);
        }
    },
    methods: {
        //添加记录
        addCostToBusinessModel(){
            this.addCostFormVisible = true;
            let projId = this.$store.state.deliverConfigBo.projId;
            let deliveryConfigId = this.$store.state.deliverConfigBo.deliveryConfigId;
            if(!projId)
                return false;
            this.loadBusinessModel(projId,deliveryConfigId)
            this.loadAreaTree(projId,15);
            this.active = 1;
            this.treeLoading = true;
        },
        finish(){
            debugger
            let batchlist = [];
            let thiz = this;
            for(let i = 0;i < this.selectAreList.length ; i++){
                let modelDatas = this.$refs['areaBusinessModelTree'+i][0].getCheckedNodes();
                if(modelDatas.length>0){
                    let data = {};
                    data.ccgCostAreaId = this.selectAreList[i].ccgCostAreaId;
                    data.nameCn = this.selectAreList[i].nameCn;
                    data.nameEn = this.selectAreList[i].nameEn;
                    data.projId = this.$store.state.deliverConfigBo.projId;
                    data.businessModelHead = [];                    
                    modelDatas.map(item=>{
                        if(!item.disabled)
                            data.businessModelHead.push({ businessModelHeadId :item.businessModelHeadId });
                    })
                    debugger
                    if(!!data.businessModelHead.length)
                        batchlist.push(data);
                }
            }
            debugger
            if(!batchlist.length){
                this.$message({
                    showClose: true,
                    message: '请选择业务模型',
                    type: 'error',
                    duration: 2000
                });
                return false;
            }
            this.$epmsDeliveryConfig(this,'00011','/costarea/costmodels','POST',{ batchlist:batchlist }).then(response=>{
                debugger
                thiz.loadlList(thiz.$store.state.deliverConfigBo.deliveryConfigId);
                thiz.addCostFormVisible = false;//关闭窗口
                thiz.active = 1;//重置为第一步
                thiz.defaultActive = ''+thiz.selectedList[0];
            });
        },
        next(){
            let thiz = this;
            this.selectAreList = [];
            this.selectedList = [];
            this.$refs.araeTree.getCheckedNodes(true).map(item=>{
                thiz.selectAreList.push(item);
                thiz.selectedList.push(item.id);
            });    
            this.defaultActive = ''+this.selectedList[0];
            if(this.selectedList.length==0){
                +
                thiz.$message({
                    showClose: true,
                    message: '请选择区域',
                    type: 'error',
                    duration: 2000
                });
                return false;
            }
            this.areaBusinessModelData = [];
            debugger            
            for(let i =0;i<this.selectAreList.length;i++){
                let businessModel = [];   
                businessModel = this.$util.deepClone(this.businessModelData);             
                let checkList = [];
                this.modelAreaRelation.filter((element, index, array) => {
                    return element.costArea == thiz.selectAreList[i].ccgCostAreaId
                }).map(item=>{
                    businessModel.some((modelItem, index, array)=>{
                        if(item.businessModelHeadId == modelItem.businessModelHeadId){
                            checkList.push(item.businessModelHeadId);
                            modelItem.disabled = true;
                            return true;
                        }
                        return false;
                    })
                })
                this.areaBusinessModelData.push({
                    area:this.selectAreList[i],
                    model:businessModel,
                    checkList:checkList
                })
                
                setTimeout(function(){
                    debugger
                    thiz.$refs['areaBusinessModelTree'+i][0].setCheckedKeys(checkList);
                },100)     
                debugger           
            }
            debugger
            if (this.active++ > 2) this.active = 1;
        },
        filterArea(value, data) {
            if (!value) return true;
            return data.nameCn.indexOf(value) !== -1;
        },
        changeSearchKey(ind,data){
            this.$refs['areaBusinessModelTree'+ind][0].filter(data);
        },
        filterBusinessModel(value, data) {
            if (!value) return true;
            return data.customName.indexOf(value) !== -1;
        },
        handleClick(tab, event) {
            switch(tab.name){
                case "first" :
                    this.$router.push({ path : '/epmsFrame/epmsDeliverConfig/epmsCreateBusinessModel'})
                break;
                case "third" :
                    this.$router.push({ path : '/epmsFrame/epmsDeliverConfig/epmsCommitReview'})
                break;
            }
            console.log(tab, event);
        },
        //删除成本区域关联业务模型
        delCostToBusinessModel(){
            let thiz = this;
            let table = tablePane.getTableView();
            let datas = [];
            table.getSelectionModel().each(item=>{
                datas.push(item.getAttrObject().businessModelAreaRelationId);
            })
            if (this.$store.state.deliverConfigBo.status == 0) {
                this.$confirm('您是否确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    thiz.$epmsDeliveryConfig(thiz, '00011', '/costarea/bizmodels/delete', 'POST', { "batchlist": datas },{ headers:{ deliveryConfigId:thiz.$store.state.deliverConfigBo.deliveryConfigId }}).then(response => {
                        thiz.loadlList(thiz.$store.state.deliverConfigBo.deliveryConfigId);
                    });
                }).catch(() => {
                });
            }else{
                this.$message({
                    type: 'error',
                    message: `当前交付配置状态不是编辑中，无法删除!`
                });
            }
        },
        //搜索列表
        searchTable(){
            let thiz = this;
            let table = tablePane.getTableView();
            table.setVisibleFunc(function(data){
                if(data.a('costAreaName').indexOf(thiz.searchKey) >=0 || data.a('customName').indexOf(thiz.searchKey) >=0)
                    return true
            });
        },
        //加载成本区域关联业务模型列表
        initCostToBusinessModelTable(bo){
            let thiz = this;
            let table = tablePane.getTableView();
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
                thiz.costTableIndex = i ;
            }
            this.areaListLoading = false;//加载完毕，隐藏loading提示
        },
        //加载成本区域关联业务模型表格
        initCostToBusinessModelTableUi(){
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
            column.setEditable(true);
            column.setEditorClass('ht.ui.editor.IntEditor');
            columnModel.add(column);            

            column = new ht.ui.Column();
            column.setDisplayName('操作');
            column.setAccessType('attr');
            column.setWidth(600);
            columnModel.add(column);
            
            table.getSelectionModel().addSelectionChangeListener(function(e){
                thiz.costDelete = table.getSelectionModel().isEmpty();
                //e.preventdefault();
            });
            //修改业务模型数量
            dataModel.addDataPropertyChangeListener(function(e){
                debugger
                let item = e.data.getAttrObject();
                let businessModelQuantity = item.businessModelQuantity;
                if(businessModelQuantity === null) {
                    businessModelQuantity = -1;
                }
                if(businessModelQuantity >= 0 && businessModelQuantity < 100000){
                     thiz.$epmsDeliveryConfig(thiz,'00011','/costarea/bizmodels/update','POST',item,{ headers:{ deliveryConfigId:thiz.$store.state.deliverConfigBo.deliveryConfigId }}).then(response =>{  
                     thiz.loadlList(thiz.$store.state.deliverConfigBo.deliveryConfigId);
                  });
                  if(e.newValue === null){
                    e.data.a('businessModelQuantity',e.oldValue);
                  }
                }else{
                    thiz.$message({
                    type: 'error',
                    message: `输入交付数量已越界，请输入正确的数量!`
                   });
                   e.data.a('businessModelQuantity',e.oldValue);
                }
            })
            tablePane.addToDOM(this.$refs.recordsTable,{width: this.$refs.tabs.$el.clientWidth,height:570});
            setTimeout(function(){
                tablePane.setWidth(thiz.$refs.tabs.$el.clientWidth)
            });
        },
        //加载成本关联业务模型列表
        loadlList(deliveryConfigId){
            let thiz = this;
            this.$epmsDeliveryConfig(this,'00011','/costarea/bizmodels/'+ deliveryConfigId ,'GET').then(response=>{
                thiz.initCostToBusinessModelTable(response.data.bo);
            });
        },
        //加载区域树
        loadAreaTree(projId,pId){
            let thiz = this;
            this.$epmsDeliveryConfig(this,'00011','/costarea/tree/'+ projId +'/' + pId,'GET').then(response=>{
                let treeinfo = response.data.bo.treeinfo;
                let modelAreaRelation = response.data.bo.modelarearelation;
                thiz.modelAreaRelation = modelAreaRelation;
                thiz.areaTreeData = [treeinfo];
                //清空已选的
                thiz.selectAreList = [];
                thiz.selectedList = [];
                thiz.checkSelected([treeinfo]);
                thiz.treeLoading = false;//
            });    
        },
        //加载业务模型列表
        loadBusinessModel(projId,deliveryConfigId){
            let thiz = this;
            this.$epmsDeliveryConfig(this,'00011','/projects/'+projId+'/deliveries/'+deliveryConfigId+'/bizmodels','GET').then(response=>{
                thiz.businessModelData = response.data.bo;
            });
        },
        //将叶子节点选上以及置灰
        checkSelected(treeinfos){
            let thiz = this;
            treeinfos.map(treeinfo=>{
                if(treeinfo.nodes.length > 0){
                    //如果有子节点，就不理会继续下去
                    thiz.checkSelected(treeinfo.nodes)
                }
                else{//叶子节点
                    if(!!treeinfo.checkedFlag){
                        thiz.selectedList.push(treeinfo.id)
                        thiz.selectAreList.push(treeinfo);
                    }
                }
            })
        }
    },
    mounted () {
        let tab = this.$refs.tabs.$el.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
        tab.style.left = '50%';
        tab.style.marginLeft = '-178px';
        let deliveryConfigId = this.$store.state.deliverConfigBo.deliveryConfigId;
        if(!deliveryConfigId)
            return false;
        this.initCostToBusinessModelTableUi();
        this.loadlList(deliveryConfigId);
    },
    destroyed (){
        tablePane.removeFromDOM();
    }
  };
</script>

<style scoped>
.breadcrumb{
    font-size: 14px;
    margin-bottom: 0px
}
.select {
    width: 120px;
    font-size: 12px;
}
.hideBeyond{
    overflow: hidden;
    text-overflow: ellipsis;
}
.right{
    height:400px;
    padding:0px 10px 10px;
    overflow-y: scroll;
}
</style>