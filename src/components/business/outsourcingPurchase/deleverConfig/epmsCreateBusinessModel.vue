<template>
  <div class="epmsCreateBusinessModel" >
    <!--导航面包屑-->
    <el-breadcrumb class="breadcrumb"   separator=">">
        <el-breadcrumb-item :to="{ path: '/epmsFrame/epmsDeliverConfig/epmsDeliverConfig/'+ modelForm.projId }">交付配置 </el-breadcrumb-item>
        <el-breadcrumb-item>制作业务模型</el-breadcrumb-item>
    </el-breadcrumb>
    <!--gG-Bom弹出层-->
    <el-popover
        v-show="isShow"
        ref="businessModelConfigList"
        placement="bottom"
        transition="collapse-transition"
        :title="popoverTitle"
        width="1000"
        trigger="click">
        <div style="float: right;margin-top: -33px;" @click="isShow = false"><el-button type="text" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></el-button></div>
        <!--G-Bom列表操作栏-->
        <div>
            <el-button type="primary" icon="plus" @click="addGBOMFormVisible = true">添加G-BOM</el-button>
            <el-button  type="primary" :disabled="gBomPaste" @click="pasteGbom"><span class="glyphicon glyphicon-paste"></span>&nbsp;&nbsp;黏贴</el-button>
            <el-button  type="primary" :disabled="gBomCopy" @click="copyGbom"><span class="glyphicon glyphicon-copy"></span>&nbsp;&nbsp;复制选中的G-BOM</el-button>
            <el-button type="danger" icon="delete2" :disabled="gBomDelete" @click="delGBom">删除选中的G-BOM</el-button>
            <div style="margin-top: 0px;float:right">
                <el-input placeholder="工作包编码/工作包" @change="searchGTable" v-model="gBomSearchKey">
                    <el-button slot="append" icon="search" @click="searchGTable"></el-button>
                </el-input>
            </div>
        </div>
        <br/>
        <!--G-Bom列表层-->
        <div ref="gBomTable" style="height:570px">

        </div> 
    </el-popover>
    <!--tab选择-->
    <el-tabs ref="tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="制作业务模型" name="first"></el-tab-pane>
        <el-tab-pane label="成本区域关联业务模型" name="second"></el-tab-pane>
        <el-tab-pane label="提交评审" name="third"></el-tab-pane>
    </el-tabs>
    <!--业务模型列表操作栏-->
    <div>
        <el-button type="primary" icon="plus" id="test_epms_add_model"  @click="addModelFormVisible = true">添加业务模型</el-button>
        <el-button  type="primary" :disabled="modelCopy" @click="copymodel"><span class="glyphicon glyphicon-copy"></span>&nbsp;&nbsp;复制选中模型</el-button>
        <el-button type="danger" icon="delete2" :disabled="modelDelete" @click="deletemodel">删除选中的模型</el-button>
        <div style="float:right;width:40%">
            <el-input placeholder="自定义名称/业务类型/建网类型/产品大类" @change="searchTable"  v-model="searchKey">
                
                <el-button slot="append" icon="search" @click="searchTable"></el-button>
            </el-input>
        </div>
    </div>
    <br/>
    <!-- 业务模型列表 -->
    <div ref="recordsTable">

    </div>    
    <!--添加业务模型层-->
    <el-dialog title="添加业务模型" :visible.sync="addModelFormVisible">
        <el-form ref='modelForm' label-position="right" :model="modelForm" :rules="rules">
            <el-form-item label="业务类型" prop="businessType" :label-width="formLabelWidth">
                <el-select v-model="modelForm.businessType" @change="businessTypeChange" filterable placeholder="请选择建网类型">
                    <el-option
                        v-for="item in BusinessTypeOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>  
            <el-form-item label="建网类型" prop="networkType" :label-width="formLabelWidth">
                <el-select v-model="modelForm.networkType" @change="networkTypeChange" filterable placeholder="请选择建网类型">
                    <el-option
                        v-for="item in networkTypeOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>  
            <el-form-item label="产品大类" prop="productCategory" :label-width="formLabelWidth">
                <el-select v-model="modelForm.productCategory" filterable placeholder="请选择产品大类">
                    <el-option
                        v-for="item in productCategoryOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>     
            <el-form-item label="自定义名称" prop="customName" :label-width="formLabelWidth">
                <el-input v-model="modelForm.customName" auto-complete="off"></el-input>
            </el-form-item>         
            <el-form-item label="业务模型量纲" prop="businessModelDimension" :label-width="formLabelWidth">
                <el-input v-model="modelForm.businessModelDimension" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                <el-input :autosize="{ minRows: 2, maxRows: 5}" type="textarea" v-model="modelForm.remark"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addModel(false)">保存并继续添加</el-button>
            <el-button type="primary" @click="addModel(true)">确认添加</el-button>
            <el-button @click="addModelFormVisible = false">取 消</el-button>           
        </div>
    </el-dialog>
    <!--添加G-BOM层-->
    <el-dialog title="添加G-BOM" :visible.sync="addGBOMFormVisible">
        <epms-gbom-select ref="gbomSelect" :projId="$store.state.deliverConfigBo.projId" :businessModelHeadId = "businessModelHeadId"></epms-gbom-select>
        <div class="btnBottom">
            <el-button type="primary" @click="addGbom" icon="check">确认添加</el-button>
            <el-button @click="addGBOMFormVisible = false">取消</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
  let tablePane = new ht.ui.TablePane();
  let tablePaneGBom = new ht.ui.TablePane();
  export default {
    data() {
      return {
          //当前点击的业务模型ID
          businessModelHeadId:'',
          busenessModelTableIndex: 0,
          activeName: 'first',
          //模型复制按钮不可用
          modelCopy:true,
          //模型删除按钮不可用
          modelDelete:true,
          //添加业务模型表单是否可用
          addModelFormVisible:false,
          addGBOMFormVisible:false,
          formLabelWidth: '120px',
          //业务类型选项
          BusinessTypeOptions:[],
          networkTypeOptions:[],
          productCategoryOptions:[],
          modelForm:{
            customName:'',
            businessType:'',
            networkType:'',
            productCategory:'',
            remark:'',
            businessModelDimension:'',
            projId:this.$store.state.deliverConfigBo.projId,
            deliveryConfigId:this.$store.state.deliverConfigBo.deliveryConfigId
          },
          rules: {
            customName: [
                { required: true, message: '请输入自定义名称', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在20个字符内', trigger: 'blur' }
            ],
            BusinessType: [
                { required: true, message: '请选择', trigger: 'blur' }
            ],
            networkType: [
                { required: true, message: '请选择', trigger: 'blur' }
            ],
            productCategory: [
                { required: true, message: '请选择', trigger: 'blur' },
            ],
            businessModelDimension: [
                { required: true, message: '请输入业务模型量纲', trigger: 'blur' }
            ]
          },
          //业务模型搜索类型
          selectType: 'customName',
          //业务模型搜索关键字
          searchKey: '',
          //G-Bom 相关
          isShow: false,
          popoverTitle: '',
          gBomSearchKey: '',
          gBomCopy: true,
          gBomDelete: true,
          gBomType: '1',
          gBomPaste: true,
          //已勾选的GBom对象列表
          gBomSelectedList:[]
      };
    },
    watch:{
        '$store.state.isCollapse': function(val){
            tablePane.setWidth(this.$refs.tabs.$el.clientWidth)
            this.$refs.businessModelConfigList.$refs.popper.style.width = this.$refs.tabs.$el.clientWidth+"px";
        },
        'gBomSelectedList':function(val){
            this.gBomPaste = val.length > 0 ? false : true;
        }
    },
    
    methods: {
        businessTypeChange(val){
            if(!val)
                return;
            let thiz = this;
            let language = this.$i18n.locale === 'zh' ? "zh-CN":"en-US";
            this.$epmsDeliveryConfig(this,'00011','/types/network/'+val+'?language='+language,'GET',{},null,'common').then(response=>{
                thiz.networkTypeOptions = response.data.bo;
            });            
            this.modelForm.networkType='';
            this.modelForm.productCategory='';
        },
        networkTypeChange(val){
            if(!val)
                return;
            let thiz = this;
            let language = this.$i18n.locale === 'zh' ? "zh-CN":"en-US";
            this.$epmsDeliveryConfig(this,'00011','/types/category/'+val+'?language='+language,'GET',{},null,'common').then(response=>{
                thiz.productCategoryOptions = response.data.bo;
            });            
            this.modelForm.productCategory='';
        },
        //搜索业务模型列表
        searchTable(){
            debugger
            let thiz = this;
            let table = tablePane.getTableView();
            table.setVisibleFunc(function(data){
                if(data.a('customName').indexOf(thiz.searchKey)>=0 || 
                data.a('businessTypeNameCn').indexOf(thiz.searchKey)>=0 ||
                data.a('networkTypeNameCn').indexOf(thiz.searchKey)>=0 ||
                data.a('productCategoryNameCn').indexOf(thiz.searchKey)>=0 )
                    return true
            });
        }, 
        //复制选中模型
        copymodel(){
            let thiz = this;
            let table = tablePane.getTableView();
            let datas = [];
            table.getSelectionModel().each(item=>{
                datas.push(item.getAttrObject());
            })
            debugger;
            thiz.$epmsDeliveryConfig(thiz,'00011','/bizmodel/copy','POST',{ batchlist:datas}).then(response=>{
                thiz.$message({
                    showClose: true,
                    message: response.body.code.msg,
                    type: 'success',
                    duration: 2000
                });
            thiz.loadBusinessModelList(thiz.$store.state.deliverConfigBo.projId);
            });
        },
        //删除选中模型
        deletemodel(){
            let thiz = this;
            let table = tablePane.getTableView();
            let selectionTable = table.getSelectionModel();
            let datas = [];
            selectionTable.each(item=>{
                datas.push(item.a("businessModelHeadId"))
            })
            this.$confirm('您是否确定要删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                thiz.$epmsDeliveryConfig(thiz,'00011','/projects/'+thiz.$store.state.deliverConfigBo.projId+'/deliveries/'+thiz.$store.state.deliverConfigBo.deliveryConfigId+'/bizmodels','DELETE',{ batchlist:datas}).then(response=>{
                    thiz.$message({
                        showClose: true,
                        message: response.body.code.msg,
                        type: 'success',
                        duration: 2000
                    });
                thiz.loadBusinessModelList(thiz.$store.state.deliverConfigBo.projId);
                });
            }).catch(() => {
            });
        },
        //搜索GBom模型列表
        searchGTable(){
            let thiz = this;
            let table = tablePaneGBom.getTableView();
            table.setVisibleFunc(function(data){
                if(data.a('workPackageName').indexOf(thiz.gBomSearchKey)>=0 ||
                data.a('workPackageCode').indexOf(thiz.gBomSearchKey)>=0)
                    return true
            });
        },
        //插入记录业务模型列表
        addBusinessMode(bo){
            let table = tablePane.getTableView();
            let dataModel = table.getDataModel();
            let data = new ht.Data();
            this.busenessModelTableIndex +=1;
            data.a('num',this.busenessModelTableIndex+1);
            for(let key in bo){
                if (bo.hasOwnProperty(key)) {
                    data.a(key,bo[key]);
                };
            }
            dataModel.add(data);
        },
        //添加业务模型提交到后台
        addModel(isClose){
            let thiz = this;
            this.$refs['modelForm'].validate((valid) => {
                if (valid) {
                    thiz.$epmsDeliveryConfig(this,'00011','/bizmodels','POST',thiz.modelForm).then(response=>{
                        thiz.$message({
                            showClose: true,
                            message: response.body.code.msg,
                            type: 'success',
                            duration: 2000
                        });
                        thiz.addBusinessMode(response.data.bo);
                        if(isClose){
                            thiz.addModelFormVisible = false
                        }
                        else
                        {
                            thiz.addModelFormVisible = true    
                        }
                        thiz.$refs['modelForm'].resetFields();//清空表单
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //确认添加GBom提交到后台
        addGbom(){
            let thiz = this;
            let datas = this.$refs.gbomSelect.getDatas();
            if(!datas.length){
                this.$message({
                    showClose: true,
                    message: '请选择工作包.',
                    type: 'error',
                    duration: 2000
                });
            }
            else{
                thiz.$epmsDeliveryConfig(this,'00011','/bizmodel/gbom','POST',{ batchlist:datas },{ headers:{ deliveryConfigId:this.$store.state.deliverConfigBo.deliveryConfigId }}).then(response=>{
                    thiz.$message({
                        showClose: true,
                        message: response.body.code.msg,
                        type: 'success',
                        duration: 2000
                    });
                    thiz.$refs.gbomSelect.clearData();
                    thiz.addGBOMFormVisible = false;
                    thiz.loadGBomList(thiz.businessModelHeadId);
                });
            }
        },
        //tab页的切换
        handleClick(tab, event) {
            switch(tab.name){
                case "second" :
                    this.$router.push({ path : '/epmsFrame/epmsDeliverConfig/epmsCostToBusinessModel'})
                break;
                case "third" :
                    this.$router.push({ path : '/epmsFrame/epmsDeliverConfig/epmsCommitReview'})
                break;
            }
            console.log(tab, event);
        },
        //加载业务模型列表
        initBusinessModelTable(bo){
            let thiz = this;
            tablePane = new ht.ui.TablePane();
            let table = tablePane.getTableView();
            let tableHeader = tablePane.getTableHeader();
            let dataModel = table.getDataModel();
            let columnModel = table.getColumnModel();
            
            tablePane.setBorder(new ht.ui.border.CSSBorder(1, '#dfe6ec', 'solid'))
            tableHeader.setPreferredSize(0,42);//设置表头的高，第一个宽无效
            tableHeader.setBackground('#eef1f6')

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
                thiz.busenessModelTableIndex = i ;
            }
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
            column.setDisplayName('业务模型编号');
            column.setAccessType('attr');
            column.setWidth(150);
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('businessTypeNameCn');
            column.setDisplayName('业务类型');
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('networkTypeNameCn');
            column.setAccessType('attr');
            column.setDisplayName('建网类型');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('productCategoryNameCn');
            column.setAccessType('attr');
            column.setDisplayName('产品大类');
            columnModel.add(column);            

            column = new ht.ui.Column();
            column.setName('customName');
            column.setDisplayName('自定义名称');
            column.setWidth(150);
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('businessModelDimension');
            column.setDisplayName('业务模型量纲');
            column.setWidth(150);
            column.setAccessType('attr');
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
            column.setWidth(500);
            columnModel.add(column);

            table.getSelectionModel().addSelectionChangeListener(function(e){
                debugger
                thiz.modelCopy = table.getSelectionModel().isEmpty();
                thiz.modelDelete = table.getSelectionModel().isEmpty(); 
                
                // && 非编辑中删除按钮也不可用
                
                //e.preventdefault();
            });
            table.onDataClicked = function(data, e){
                debugger
                if(e.offsetX<40){
                    return false;
                }
                thiz.isShow = true;
                thiz.$refs.businessModelConfigList.$refs.popper.style.display = 'block';
                thiz.$refs.businessModelConfigList.$refs.popper.style.position = 'fixed';
                thiz.$refs.businessModelConfigList.$refs.popper.style.bottom = '0px';
                thiz.$refs.businessModelConfigList.$refs.popper.style.width = thiz.$refs.tabs.$el.clientWidth+"px";
                thiz.popoverTitle = data.a('businessModelHeadNo');
                let businessModelHeadId = data.a('businessModelHeadId')
                thiz.loadGBomList(businessModelHeadId);//'bda08f9c-1764-4b49-b89a-56c86dd43a44'
                thiz.businessModelHeadId = businessModelHeadId;
            };
            tablePane.addToDOM(this.$refs.recordsTable,{width: this.$refs.tabs.$el.clientWidth,height:570});
            setTimeout(function(){
                tablePane.setWidth(thiz.$refs.tabs.$el.clientWidth)
            });
        },
        //加载业务模型列表
        loadBusinessModelList(projId){
            let thiz = this;
            this.$epmsDeliveryConfig(this,'00011','/projects/'+projId+'/deliveries/'+this.$store.state.deliverConfigBo.deliveryConfigId+'/bizmodels','GET').then(response=>{
                thiz.initBusinessModelTable(response.data.bo);
            });
        },
        //加载GBom列表
        loadGBomList(businessModelHeadId){
            debugger
            let thiz = this;
            this.$epmsDeliveryConfig(this,'00011','/bizmodel/gboms/'+businessModelHeadId+'/?language=zh_CN','GET').then(response=>{
                debugger
                thiz.changeGBomData(response.data.bo);
            });
        },
         //删除GBom
        delGBom() {
            let thiz = this;
            let table = tablePaneGBom.getTableView();
            let selectionTable = table.getSelectionModel();
            let tableList = [];
            selectionTable.each(item => tableList.push(item.a("businessModelDetailsId")));
            if (this.$store.state.deliverConfigBo.status == 0) {
                this.$confirm('您是否确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$epmsDeliveryConfig(this, '00011', '/bizmodel/gbom/delete/', 'POST', { "batchlist": tableList }).then(response => {
                        debugger
                        thiz.loadGBomList(thiz.businessModelHeadId);
                    });
                }).catch(() => {
                });
            }else{
                    this.$message({
                    type: 'info',
                    message: `当前交付配置状态不是编辑中，无法删除GBom!`
                   });
            }
        },
        //
        changeGBomData(bo){
            let table = tablePaneGBom.getTableView();
            let dataModel = table.getDataModel();
            dataModel.clear();
            debugger
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
        //载入GBom的UI
        initGBomTableUi(){
            let thiz = this;
            tablePaneGBom = new ht.ui.TablePane();
            let table = tablePaneGBom.getTableView();
            let tableHeader = tablePaneGBom.getTableHeader();
            let dataModel = table.getDataModel();
            let columnModel = table.getColumnModel();
            
            tablePaneGBom.setBorder(new ht.ui.border.CSSBorder(1, '#dfe6ec', 'solid'))
            tableHeader.setPreferredSize(0,42);//设置表头的高，第一个宽无效
            tableHeader.setBackground('#eef1f6')

            tablePaneGBom.getTableView().setCheckMode(true); //设置有全选模式

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
            
            //修改GBom交付数量
            dataModel.addDataPropertyChangeListener(function(e){
                debugger
                let item = e.data.getAttrObject();
                let gbomQuantity = item.deliveryQuantity;
                if(gbomQuantity === null) {
                    gbomQuantity = 0;
                }
                if(gbomQuantity >= 0 && gbomQuantity < 100000){
                     thiz.$epmsDeliveryConfig(thiz,'00011','/bizmodel/gbom/updateDeliveryQuantity/','POST',{"batchlist":[item]}).then(response =>{  
                     thiz.loadGBomList(thiz.businessModelHeadId);
                  });
                  if(e.newValue === null){
                    e.data.a('deliveryQuantity',e.oldValue);
                  }
                }else{
                    thiz.$message({
                    type: 'info',
                    message: `输入交付数量已越界，请输入正确的交付数量!`
                   });
                   e.data.a('deliveryQuantity',e.oldValue);
                }
            })

            table.getSelectionModel().addSelectionChangeListener(function(e){
                debugger
                // thiz.gBomPaste = table.getSelectionModel().isEmpty();
                thiz.gBomDelete = table.getSelectionModel().isEmpty();
                thiz.gBomCopy = table.getSelectionModel().isEmpty();
                //e.preventdefault();
            });
            debugger
            tablePaneGBom.addToDOM(this.$refs.gBomTable,{width: this.$refs.tabs.$el.clientWidth-35,height:570});
            setTimeout(function(){
                tablePaneGBom.setWidth(thiz.$refs.tabs.$el.clientWidth-35)
            });
        },
        //复制Gbom列表
        copyGbom(){
            let thiz = this;
            let table = tablePaneGBom.getTableView();
            let selectionTable = table.getSelectionModel();
            let datas = [];
            selectionTable.each(item => datas.push(item.getAttrObject()));
            thiz.gBomSelectedList = datas;
            this.$message({
                showClose: true,
                message: '复制成功',
                type: 'success'
            });
        },
        //粘贴Gbom列表
        pasteGbom(){
            let thiz = this;
            if(thiz.$store.state.deliverConfigBo.status != 0) {
                this.$message({
                    showClose: true,
                    message: '交付配置状态不是编辑中，不允许操作！',
                    type: 'error'
                });         
            }
            thiz.$epmsDeliveryConfig(this,'00011','/bizmodel/gbom/paste/' + thiz.businessModelHeadId,'POST',{ batchlist:thiz.gBomSelectedList },{ headers:{ deliveryConfigId:this.$store.state.deliverConfigBo.deliveryConfigId }}).then(response=>{
                    thiz.$message({
                        showClose: true,
                        message: response.body.code.msg,
                        type: 'success',
                        duration: 2000
                    });
                    thiz.gBomSelectedList = [];
                    thiz.loadGBomList(thiz.businessModelHeadId);
                });
        },
        //加载业务类型
        loadBusinessType(){
            let thiz = this;
            let language = this.$i18n.locale === 'zh' ? "zh-CN":"en-US";
            this.$epmsDeliveryConfig(this,'00011','/types/business?language='+language,'GET',{},null,'common').then(response=>{
                thiz.BusinessTypeOptions = response.data.bo;
            });
        }
    },
    mounted () {
        debugger
        let tab = this.$refs.tabs.$el.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
        tab.style.left = '50%';
        tab.style.marginLeft = '-178px';
        let projId = this.$store.state.deliverConfigBo.projId;
        if(!projId)
            return false;
        this.loadBusinessModelList(projId);
        this.loadBusinessType();
        this.initGBomTableUi();
        //this.$refs.tabs.$el.firstChild.style.border='0px';
    },
    destroyed (){
        tablePane.removeFromDOM();
    }
  };
</script>

<style scoped>
.btnBottom{
    float: right;
    padding: 15px 0 15px 0;
}
.breadcrumb{
    font-size: 14px;
    margin-bottom: 0px
}
.select {
    width: 120px;
    font-size: 12px;
}
</style>