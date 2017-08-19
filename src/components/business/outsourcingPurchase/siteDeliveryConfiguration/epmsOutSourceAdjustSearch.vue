<template>
    <div class="epmsOutSourceAdjustSearch">
        <div class="block" style="height:60px;margin-top:6px;margin-left:20px;margin-right:20px;border: 1px solid #e0e0e0;">
            <div style="margin-top:8px;margin-left:6px;">
                <span class="demonstration">状态：</span>
                <span class="wrapper">
                    <el-button :type="allStatusbtType" @click="allStatusbtClick()" :autofocus="true">全部状态</el-button>
                    <el-button :type="editingbtType" @click="editingbtClick()">编辑中</el-button>
                    <el-button :type="beReviewbtType" @click="beReviewbtClick()">待评审</el-button>
                    <el-button :type="invalidbtType" @click="invalidbtClick()">失效</el-button>
                    <el-button :type="passbtType" @click="passbtClick()">通过</el-button>
                    <el-button :type="rejectbtType" @click="rejectbtClick()">驳回</el-button>
                </span>
            </div>
        </div>
        <div style="margin-left:20px;margin-right:20px">
            <hr style="height:1px;border:none;border-top:1px dashed #e0e0e0;" />
        </div>
        <!--查询框-->
        <div style="height:40px;margin-left:20px;margin-right:20px">
            <el-button type="primary" icon="plus" @click="inputAdjustOrder()">录入</el-button>
            <el-button type="danger" :disabled="batchTagInvalid" @click="batchTagInvalidClick()"><span class="glyphicon glyphicon-copy"></span>&nbsp;&nbsp;批量标记失效</el-button>
            <el-button type="danger" icon="delete2" :disabled="batchDelete" @click="batchDeleteClick()">批量删除</el-button>
            <div style="float:right;width:30%">
                <el-row>
                    <el-col :span="18">
                        <el-input placeholder="项目编号/项目名称" v-model="projNumOrName">
                            <el-button slot="append" icon="search" type="primary" @click="searchTable()"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button style="margin-left:5px" type="primary" @click="advancedSearchTable()">高级查询</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        
        <div v-show="isShowSearch" style="border-color:#0000FF;border: 0px solid;margin-left:20px;margin-right:20px">
            <div >
                <hr style="height:1px;border:none;border-top:1px dashed #e0e0e0;" />
            </div>
            <div style="height:30px;background-color:#f0f0f0;">
                <span style="float:left;margin-left:20px;margin-top:4px;font-family:'黑体';font-size:15px;color:#46a3ff;">高级查询</span>
                <i @click="closeAdvancedSearch()" style="float:right;margin-top:5px;margin-right:5px;cursor:pointer;" class="el-icon-close"></i>
            </div>
            <div style="height:225px;background-color:#fcfcfc;"><br>
                <div >
                    <el-form :model="ruleForm" ref="ruleForm" label-width="150px" label-position="right">
                        <el-form-item style="height:20px" >
                            <el-col :span="8">
                                <el-form-item label="项目编号：" prop="projNo" >
                                    <el-input v-model="ruleForm.projNo" style="width:210px"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="单据编号：" prop="outsourcingAdjustNo">
                                    <el-input v-model="ruleForm.outsourcingAdjustNo" style="width:210px"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="创建人：" prop="createUser">
                                    <el-input v-model="ruleForm.createUser" style="width:210px"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item style="height:20px" >
                            <el-col :span="8">
                                <el-form-item label="项目名称：" prop="projName">
                                    <el-input v-model="ruleForm.projName" style="width:210px"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="订单编号：" prop="orderNo">
                                    <el-input v-model="ruleForm.orderNo" style="width:210px"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="生效日期：" prop="enableData">
                                    <el-date-picker style="width:210px"  v-model="ruleForm.enableData"  type="date" placeholder="选择生效日期"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item style="height:20px" >
                            <el-col :span="8">
                                <el-form-item label="项目类型：" prop="projectType">
                                    <el-select style="width:210px" placeholder="请选择项目类型" clearable v-model="ruleForm.projectType">
                                        <el-option label="工程" value="工程"></el-option>
                                        <el-option label="服务" value="服务"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="业务类型：" prop="businessType">
                                    <el-select style="width:210px" placeholder="请选择业务类型" clearable v-model="ruleForm.businessType">
                                        <el-option label="单次有效" value="单次有效"></el-option>
                                        <el-option label="滚动有效" value="滚动有效"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                            </el-col>
                        </el-form-item>
                        <el-form-item style="height:20px" >
                            <el-col :span="8">
                                <el-form-item label="代表处：" prop="dept">
                                    <el-input v-model="ruleForm.dept" style="width:210px"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="外包额度调整类型：" prop="adjustType">
                                    <el-select style="width:210px" placeholder="请选择外包额度调整类型" clearable v-model="ruleForm.adjustType">
                                        <el-option label="启动资金" value="启动资金"></el-option>
                                        <el-option label="项目历史" value="项目历史"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item style="height:30px;float:right;margin-right:20px" >
                                    <el-button type="primary" @click="showAdvancedSearchResult()">查询</el-button>
                                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>

        <!-- 查询结果显示 -->

        <div ref="reTable" style="margin-left:20px;margin-right:20px;margin-top:5px;">
  
        </div>
    </div>
</template>

<script>
let tablePane = null;
    export default{
        data(){
            return{
                batchTagInvalid:true,//批量标记失效不可操作
                batchDelete:true,//批量删除按钮不可操作
                isShowSearch:false,//高级查询div是否显示
                projNumOrName:'',//根据项目编号/名称查找关键字
                allStatusbtType:'primary',//全部状态
                editingbtType:'',//编辑中
                beReviewbtType:'',//待评审
                invalidbtType:'',//失效
                passbtType:'',//通过
                rejectbtType:'',//驳回
                searchCondition:1,//0--模糊查  1--高级查

                ruleForm:{
                    projNo:'',//项目编号
                    outsourcingAdjustNo:'',//单据编号
                    createUser:'',//创建人
                    projName:'',//项目名称
                    orderNo:'',//订单编号
                    enableData:'',//生效日期起
                    projectType:'',//项目类型
                    businessType:'',//业务类型
                    dept:'',//代表处
                    adjustType:'',//外包额度调整类型
                },
                // tableData: [{
                //     outsourcingAdjustNo:'',//outsourcingAdjustNo
                //     projNo:'',//projNo
                //     projName:'',//projName
                //     dept:'',//dept
                //     orderNo:'',//orderNo
                //     projectType:'',//projectType
                //     businessType:'',//businessType
                //     adjustType:'',//adjustType
                //     enableData:'',//enableData
                //     validData:'',//validData
                //     updateUser:'',//updateUser
                //     updateDate:'',//updateDate
                //     status:'',//status
                // }],

            }
        },
        methods:{

            //根据状态选择查询接口
            searchbyStatus(allStat){
                let statusSearch='';
                if(allStat!='全部状态'){
                    statusSearch=allStat;
                }
                if(this.searchCondition==0){
                    let searchStr=this.projNumOrName;
                    this.$epmsDeliveryConfig(this,'00011','/adjustQuery/'+ searchStr +'/' + allStat,'GET',{},null,"outsourcing").then(response=>{
                        this.loadOutSourceAdjustTable(response.data.bo);
                    });
                }else{
                    this.$epmsDeliveryConfig(this,'00011','/adjustHQuery','POST',{outsourcingAdjustNo:this.ruleForm.outsourcingAdjustNo,createUser:this.ruleForm.createUser,
                    projName:this.ruleForm.projName,orderNo:this.ruleForm.orderNo,enableData:this.ruleForm.enableData,projectType:this.ruleForm.projectType,
                    businessType:this.ruleForm.businessType,dept:this.ruleForm.dept,adjustType:this.ruleForm.adjustType,status:statusSearch},null,"outsourcing").then(response=>{
                        this.loadOutSourceAdjustTable(response.data.bo);
                    });
                }
            },
            //全部状态
            allStatusbtClick(){
                let thiz = this;
                this.allStatusbtType='primary';//全部状态
                this.editingbtType='';//编辑中
                this.beReviewbtType='';//待评审
                this.invalidbtType='';//失效
                this.passbtType='';//通过
                this.rejectbtType='';//驳回
                let allStat='全部状态';
                this.searchbyStatus(allStat);
            },
            //编辑中
            editingbtClick(){
                let thiz = this;
                this.allStatusbtType='';//全部状态
                this.editingbtType='primary';//编辑中
                this.beReviewbtType='';//待评审
                this.invalidbtType='';//失效
                this.passbtType='';//通过
                this.rejectbtType='';//驳回
                let allStat='编辑中';
                this.searchbyStatus(allStat);
            },
            //待评审
            beReviewbtClick(){
                let thiz = this;
                this.allStatusbtType='';//全部状态
                this.editingbtType='';//编辑中
                this.beReviewbtType='primary';//待评审
                this.invalidbtType='';//失效
                this.passbtType='';//通过
                this.rejectbtType='';//驳回
                let allStat='待评审';
                this.searchbyStatus(allStat);
            },
            //失效
            invalidbtClick(){
                let thiz = this;
                this.allStatusbtType='';//全部状态
                this.editingbtType='';//编辑中
                this.beReviewbtType='';//待评审
                this.invalidbtType='primary';//失效
                this.passbtType='';//通过
                this.rejectbtType='';//驳回
                let allStat='失效';
                this.searchbyStatus(allStat);
            },
            //通过
            passbtClick(){
                let thiz = this;
                this.allStatusbtType='';//全部状态
                this.editingbtType='';//编辑中
                this.beReviewbtType='';//待评审
                this.invalidbtType='';//失效
                this.passbtType='primary';//通过
                this.rejectbtType='';//驳回
                let allStat='通过';
                this.searchbyStatus(allStat);
            },
            //驳回
            rejectbtClick(){
                let thiz = this;
                this.allStatusbtType='';//全部状态
                this.editingbtType='';//编辑中
                this.beReviewbtType='';//待评审
                this.invalidbtType='';//失效
                this.passbtType='';//通过
                this.rejectbtType='primary';//驳回
                let allStat='驳回';
                this.searchbyStatus(allStat);
            },
            //批量标记失效
            batchTagInvalidClick(){

            },
            //批量删除
            batchDeleteClick(){

            },

            //加载外包额度查询表格
            loadOutSourceAdjustTable(bos) {
                let thiz = this;
                tablePane = new ht.ui.TablePane();
                let table = tablePane.getTableView();
                let tableHeader = tablePane.getTableHeader();
                let dataModel = table.getDataModel();
                let columnModel = table.getColumnModel();

                tablePane.setBorder(new ht.ui.border.CSSBorder(1, '#dfe6ec', 'solid'))
                tableHeader.setPreferredSize(100, 42);//设置表头的高，第一个宽无效
                tableHeader.setBackground('#eef1f6');

                let datas = bos;
                for (let i = 0; i < datas.length; i++) {
                    let data = new ht.Data();
                    data.a('num', i + 1);
                    //data.a('deliveryConfigNo', this.$store.state.deliverConfigBo.deliveryConfigNo);////////////
                    for (let key in datas[i]) {
                    if (datas[i].hasOwnProperty(key)) {
                        data.a(key, datas[i][key]);
                    };
                    }
                    dataModel.add(data);
                }

                tablePane.getTableView().setCheckMode(true); //设置有全选模式

                let column = new ht.ui.Column();
                column.setName('num');
                column.setDisplayName('序号');
                column.setAccessType('attr');
                columnModel.add(column);

                column = new ht.ui.Column();
                column.setName('outsourcingAdjustNo');
                column.setDisplayName('单据编号');
                column.setAccessType('attr');
                columnModel.add(column);

                column = new ht.ui.Column();
                column.setName('projNo');
                column.setDisplayName('项目编号');
                column.setAccessType('attr');
                columnModel.add(column);

                column = new ht.ui.Column();
                column.setName('projName');
                column.setAccessType('attr');
                column.setDisplayName('项目名称');
                columnModel.add(column);

                column = new ht.ui.Column();
                column.setName('dept');
                column.setAccessType('attr');
                column.setDisplayName('代表处');
                columnModel.add(column);

                column = new ht.ui.Column();
                column.setName('orderNo');
                column.setDisplayName('订单编号');
                column.setAccessType('attr');
                columnModel.add(column);

                column = new ht.ui.Column();
                column.setName('projectType');
                column.setDisplayName('项目类型');
                column.setAccessType('attr');
                columnModel.add(column);

                column = new ht.ui.Column();
                column.setName('businessType');
                column.setDisplayName('业务类型');
                column.setAccessType('attr');
                columnModel.add(column);

                column = new ht.ui.Column();
                column.setName('adjustType');
                column.setDisplayName('外包额度调整类型');
                column.setAccessType('attr');
                columnModel.add(column);

                column = new ht.ui.Column();
                column.setName('enableData');
                column.setDisplayName('生效日期');
                column.setAccessType('attr');
                columnModel.add(column);

                column = new ht.ui.Column();
                column.setName('validData');
                column.setDisplayName('外包调整有效期');
                column.setAccessType('attr');
                columnModel.add(column);

                column = new ht.ui.Column();
                column.setName('updateUser');
                column.setDisplayName('提交人');
                column.setAccessType('attr');
                columnModel.add(column);

                column = new ht.ui.Column();
                column.setName('updateDate');
                column.setDisplayName('提交日期');
                column.setAccessType('attr');
                columnModel.add(column);

                column = new ht.ui.Column();
                column.setName('status');
                column.setDisplayName('状态');
                column.setAccessType('attr');
                columnModel.add(column);
                
                column = new ht.ui.Column();
                column.setDisplayName('操作');
                column.setAccessType('attr');
                column.setWidth(200);
                columnModel.add(column);
                
                //根据状态显示相应的操作类别
                column.drawCell = function (g, data, selected, column, x, y, width, height) {
                    let statusResult = data.getAttr("status");
                    let url = "";
                    let url2 = "";
                    let di = document.createElement("div");
                    //di.setAttribute("width","18px");
                    let btn1 = document.createElement("a");
                    btn1.type = "button";
                    btn1.setAttribute("class", "btn btn-link");
                    if (statusResult == "待评审") {
                        di.appendChild(btn1);
                        btn1.innerHTML = "评审";
                        url = "#/epmsFrame/epmsCreateBusinessModel";
                    }else if(statusResult == "通过"){
                        di.appendChild(btn1);
                        btn1.innerHTML = "标为失效";
                        url = "#/epmsFrame/epmsCreateBusinessModel";
                    }else if(statusResult == "失效"){
                        di.appendChild(btn1);
                        btn1.innerHTML = "查看";
                        url = "#/epmsFrame/epmsCreateBusinessModel";
                    }else if(statusResult == "编辑中"){
                        let btn2=document.createElement("a");
                        btn2.type="button";
                        btn2.setAttribute("class", "btn btn-link");
                        di.appendChild(btn1);
                        di.appendChild(btn2);
                        btn1.innerHTML = "修改";
                        btn2.innerHTML = "删除";
                        url = "#/epmsFrame/epmsCreateBusinessModel";
                        url2 = "#/epmsFrame/epmsCreateBusinessModel";
                        btn2.addEventListener('click', function (e) {
                            window.open(url2);
                        });
                    }else if(statusResult == "驳回"){
                        let btn2=document.createElement("a");
                        btn2.type="button";
                        btn2.setAttribute("class", "btn btn-link");
                        di.appendChild(btn1);
                        di.appendChild(btn2);
                        btn1.innerHTML = "修改";
                        btn2.innerHTML = "删除";
                        url = "#/epmsFrame/epmsCreateBusinessModel";
                        url2 = "#/epmsFrame/epmsCreateBusinessModel";
                        btn2.addEventListener('click', function (e) {
                            window.open(url2);
                        });
                    }
                    btn1.addEventListener('click', function (e) {
                        window.open(url);
                    });
                    return di;
                    };

                table.getSelectionModel().addSelectionChangeListener(function(e){
                    thiz.batchTagInvalid = table.getSelectionModel().isEmpty();
                    thiz.batchDelete = table.getSelectionModel().isEmpty();
                    //e.preventdefault();
                });

                tablePane.addToDOM(this.$refs.reTable, { width: 1550, height: 480 });//如何自动获取宽度??????????????????  this.$refs.ruleForm.$el.clientWidth
                setTimeout(function () {
                    tablePane.setWidth(1550);
                });
            },

            //查询，根据项目编号/项目名称查找     状态变为“全部状态”
            searchTable(){
                let searchStr=this.projNumOrName;
                if(searchStr==""){
                    alert("请先输入！");
                }else{
                    this.allStatusbtType='primary';//全部状态
                    this.editingbtType='';//编辑中
                    this.beReviewbtType='';//待评审
                    this.invalidbtType='';//失效
                    this.passbtType='';//通过
                    this.rejectbtType='';//驳回
                    this.searchCondition=0;//是否根据项目编号/项目名称查找关键字
                    this.isShowSearch=false;
                    this.$refs['ruleForm'].resetFields();
                    let allStat='全部状态';
                    let searchStr=this.projNumOrName;
                    this.$epmsDeliveryConfig(this,'00011','/adjustQuery/'+ searchStr +'/' + allStat,'GET',{},null,"outsourcing").then(response=>{
                    //this.$epmsDeliveryConfig(this,'00011','/adjustQuery','POST',{project:searchStr},null,"outsourcing").then(response=>{
                    this.loadOutSourceAdjustTable(response.data.bo);
                    //this.$epmsDeliveryConfig(this,'00011','/adjustQuery','POST',{project:searchStr,statusKey:allStat},null,"outsourcing").then(response=>{
                    //this.tableData = response.data.bo;
                    });
                }
               
            },
            //打开高级查询表单
            advancedSearchTable(){
                this.isShowSearch=true;
                this.$refs['ruleForm'].resetFields();
            },
            //高级查询结果,显示    状态变为“全部状态”
            showAdvancedSearchResult(){
                //debugger
                let thiz = this;
                thiz.projNumOrName='';
                this.allStatusbtType='primary';//全部状态
                this.editingbtType='';//编辑中
                this.beReviewbtType='';//待评审
                this.invalidbtType='';//失效
                this.passbtType='';//通过
                this.rejectbtType='';//驳回
                this.searchCondition=1;
                this.$epmsDeliveryConfig(this,'00011','/adjustHQuery','POST',{outsourcingAdjustNo:this.ruleForm.outsourcingAdjustNo,createUser:this.ruleForm.createUser,
                projName:this.ruleForm.projName,orderNo:this.ruleForm.orderNo,enableData:this.ruleForm.enableData,projectType:this.ruleForm.projectType,
                businessType:this.ruleForm.businessType,dept:this.ruleForm.dept,adjustType:this.ruleForm.adjustType,status:''},null,"outsourcing").then(response=>{
                    thiz.loadOutSourceAdjustTable(response.data.bo);
                });
            },
            //关闭高级设置,同时ruleForm中元素置空
            closeAdvancedSearch(){
                this.isShowSearch=false;
                this.$refs['ruleForm'].resetFields();
            },
            //重置表单
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
            //选择框
            handleSelectionChange(val) {
                //this.multipleTable
                this.batchDelete=false;
            },
            //查看
            handleView(index, row) {
                
            },
            //修改
            handleEdit(index, row) {
                
            },
            //删除
            handleDelete(index, row) {
                
            },
            //评审
            handleReview(index, row) {
                
            },
            //标为失效
            handleMarkAsInvalid(index, row) {
                
            },
            //录入，传入参数并跳转到调整单录入界面
            inputAdjustOrder(){
                this.$router.push({ path : '/epmsFrame/epmsSiteDeliverConfig/epmsInputOutSourceAdjustInfo'});
            },

        },
        mounted(){
            //  let thiz = this;
            //  let searchStr=thiz.projNumOrName;
            //  let allStat='全部状态';
            //  this.$epmsDeliveryConfig(this,'00011','/adjustQuery/'+ searchStr +'/' + allStat,'POST',null,"outsourcing").then(response=>{
            ////this.$epmsDeliveryConfig(this,'00011','/adjustQuery','POST',this.ruleForm,null,"outsourcing").then(response=>{
                //thiz.tableData = response.data.bo;
            //    this.loadOutSourceAdjustTable(response.data.bo);
            //});
            //加了状态查询后引用下述代码
            this.$epmsDeliveryConfig(this,'00011','/adjustHQuery','POST',{outsourcingAdjustNo:this.ruleForm.outsourcingAdjustNo,createUser:this.ruleForm.createUser,
                projName:this.ruleForm.projName,orderNo:this.ruleForm.orderNo,enableData:this.ruleForm.enableData,projectType:this.ruleForm.projectType,
                businessType:this.ruleForm.businessType,dept:this.ruleForm.dept,adjustType:this.ruleForm.adjustType,status:''},null,"outsourcing").then(response=>{
                this.loadOutSourceAdjustTable(response.data.bo);
            });
        },
    }
</script>

<style scoped>
    
</style>