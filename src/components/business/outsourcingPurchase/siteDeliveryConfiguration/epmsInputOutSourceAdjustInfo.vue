<template>
    <div>
        <div style="height:80px;background-color:#f0f0f0;">
            <div style="height:30px; ">
                <span style="float:left;margin-left:5px;margin-top:5px;">录入外包额度调整单</span>
                <span style="float:right;margin-right:5px;margin-top:5px;">外包额度调整单 > 录入</span>
            </div>
            <div style="float:left;margin-left:10px;margin-top:5px;" >
                <el-button type="primary"  @click="submitOutSourceAdjust('ruleForm')">提交</el-button>
                <el-button type="primary" @click="saveOutSourceAdjust('ruleForm')">保存</el-button>
                <el-button type="danger" @click="deleteOutSourceAdjust('ruleForm')">删除</el-button>
            </div>
        </div>
        <div style="height:20px;margin-top:15px;">
            <span style="margin-top:5px;font-family:'黑体';font-weight:bold;">单据编号：{{documentNumMessage}}</span>
            <span><el-tag style="size:small;" type="warning">{{statusTagMessage}}</el-tag></span>
        </div>
        <div><hr/></div>
        <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" label-position="right">
                <el-form-item  >
                    <el-col :span="8">
                        <el-form-item label="项目编号：" prop="projNo" >
                            <el-select v-model="ruleForm.projNo" filterable placeholder="请选择项目编号" style="width:210px" @change="projNoChange">
                                <!-- <el-option
                                    v-for="item in projNoOptions"
                                    :key="item.code"
                                    :label="item.label"
                                    :value="item.code">  
                                </el-option>  -->
                                <el-option label="10" value="10"></el-option>
                                <el-option label="12" value="12"></el-option>
                                <el-option label="13" value="13"></el-option>
                                <el-option label="14" value="14"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="项目类型：" prop="projectType">
                            <el-select style="width:210px" placeholder="请选择项目类型" clearable v-model="ruleForm.projectType" >
                                <el-option label="工程" value="工程"></el-option>
                                <el-option label="服务" value="服务"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="外包调整类型：" prop="adjustType">
                            <el-select style="width:210px" placeholder="请选择外包额度调整类型" clearable v-model="ruleForm.adjustType">
                                <el-option label="启动资金" value="启动资金"></el-option>
                                <el-option label="项目历史" value="项目历史"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item  >
                    <el-col :span="8">
                        <el-form-item label="项目名称：" prop="projName">
                            <span>{{ruleForm.projName}}</span>
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
                        <el-form-item label="人员租赁金额：" prop="humanAmount">
                            <el-input style="width:210px"  v-model="ruleForm.humanAmount"  placeholder="$（美元）"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                
                <el-form-item  >
                    <el-col :span="8">
                        <el-form-item label="代表处：" prop="dept">
                            <span>{{ruleForm.dept}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="订单编号：" prop="orderNo">
                            <el-select v-model="ruleForm.orderNo" filterable clearable placeholder="请选择项目编号" style="width:210px">
                                <!-- <el-option
                                    v-for="item in orderNoOptions"
                                    :key="item.code"
                                    :label="item.label"
                                    :value="item.code"> -->
                                    <el-option label="101" value="101"></el-option>
                                    <el-option label="112" value="112"></el-option>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工程外包金额：" prop="engineAmount">
                            <el-input v-model="ruleForm.engineAmount" style="width:210px" placeholder="$（美元）"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item  >
                    <el-col :span="8">
                        <el-form-item label="版本号：" prop="version">
                            <span>{{ruleForm.version}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="外包调整有效期：" prop="validDataType">
                            <el-select style="width:210px" placeholder="请选择有效期" clearable v-model="ruleForm.validDataType">
                                <el-option label="一个月" value="一个月"></el-option>
                                <el-option label="持续有效" value="持续有效"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="外包调整总金额：" prop="totalAmount">
                            <!--<el-input v-model="ruleForm.totalAmount" style="width:210px" placeholder="$（美元）" ></el-input> -->
                            <!--<span>{{ruleForm.humanAmount+ruleForm.engineAmount}}</span>  -->
                            <span>{{total}}（美元）</span>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item style="margin-top:40px" >
                    <el-col :span="24">
                        <el-form-item label="备注：" prop="memo">
                            <el-input type="textarea"  v-model="ruleForm.memo" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item   >
                    <el-col :span="8">
                        <el-form-item label="附件：">
                            <el-button @click="InsertAppendixClick"> + 添加附件</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16"></el-col>
                </el-form-item>
            </el-form>
        </div>
        <div style="margin-top:40px;">
            <el-form label-position="top" :model="ruleForm1" ref="ruleForm1" label-width="150px">
                    <el-form-item >
                        <el-col :span="18" :offset="5">
                            <el-form-item label="附件名称1.doc （126KB）" prop="appendixmemo1">
                                <el-input type="textarea"  v-model="ruleForm1.appendixmemo1" placeholder="请在此处填写备注信息"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item >
                        <el-col :span="18" :offset="5">
                            <el-form-item label="附件名称2.doc （126KB）" prop="appendixmemo2">
                                <el-input type="textarea"  v-model="ruleForm1.appendixmemo2" placeholder="请在此处填写备注信息"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item >
                        <el-col :span="18" :offset="5">
                            <el-form-item label="附件名称3.doc （126KB）" prop="appendixmemo3">
                                <el-input type="textarea"  v-model="ruleForm1.appendixmemo3" placeholder="请在此处填写备注信息"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item >
                        <el-col :span="18" :offset="5">
                            <el-form-item label="附件名称4.doc （126KB）" prop="appendixmemo4">
                                <el-input type="textarea"  v-model="ruleForm1.appendixmemo4" placeholder="请在此处填写备注信息"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item >
                        <el-col :span="18" :offset="5">
                            <el-form-item label="附件名称5.doc （126KB）" prop="appendixmemo5">
                                <el-input type="textarea"  v-model="ruleForm1.appendixmemo5" placeholder="请在此处填写备注信息"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
            </el-form>
        </div>
        
    </div>
</template>

<script>
    export default{
        data(){
            var validatehumanAmount = (rule, value, callback) => {
                setTimeout(() => {
                    if (isNaN(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        callback();
                        }
                    }, 1000);
            };
            var validateengineAmount = (rule, value, callback) => {
                setTimeout(() => {
                    if (isNaN(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        callback();
                        }
                    }, 1000);
            };
            return{
                documentNumMessage:'201708032001_D01_QD_V1.0',//单据编号message
                statusTagMessage:'编辑中',//状态message
                projNoOptions:[],//项目编号选项
                orderNoOptions:[],//订单编号选项
                ruleForm:{
                    projNo:'',//项目编号
                    projectType:'',//项目类型
                    adjustType:'',//外包调整类型
                    projName:'',//项目名称
                    businessType:'',//业务类型
                    humanAmount:'',//人员租赁金额
                    dept:'',//代表处
                    orderNo:'',//订单编号
                    engineAmount:'',//工程外包金额
                    version:'',//版本号
                    validDataType:'',//外包调整有效期
                    totalAmount:'',//外包调整总金额
                    memo:''//备注
                },
                rules: {
                    projNo: [{ required: true, message: '请选择项目编号', trigger: 'change' }],
                    projectType: [{ required: true, message: '请选择项目类型', trigger: 'change' }],
                    adjustType: [{ required: true, message: '请选择外包调整类型', trigger: 'change' }],
                    businessType: [{ required: true, message: '请选择业务类型', trigger: 'change' }],
                    //orderNo: [{ required: true, message: '请选择订单编号', trigger: 'blur' }],
                    validDataType:[{ required: true, message: '请选择外包调整有效期', trigger: 'change' }],
                    humanAmount:[{ validator: validatehumanAmount, trigger: 'blur' }],
                    engineAmount:[{ validator: validateengineAmount, trigger: 'blur' }],
                },
                ruleForm1:{
                    appendixmemo1:'',//附件1备注
                    appendixmemo2:'',
                    appendixmemo3:'',
                    appendixmemo4:'',
                    appendixmemo5:'',
                }
            }
        },
        computed:{
            total:function(){
                return this.ruleForm.humanAmount*1+this.ruleForm.engineAmount*1;
            }
        },
        methods:{
            //项目编号输入框输入后查找 项目编号列表
            loadprojectIDOptions(){
                
            },
            //项目编号选中后
            projNoChange(val){
                if(!val){
                    return;
                }else{
                    // this.ruleForm.projName = 'projName';
                    // this.ruleForm.dept = 'dept';
                    // this.ruleForm.version = 'version';

                    // //4、选择项目后，自动带出该项目的项目名称、代表处，以及该项目最新预算版本号，如果该项目还没有做个预算，则版本号为空。
                    // this.$epmsDeliveryConfig(this,'00011','/adjustQuery/'+ val ,'GET',{}, null , "outsourcing" ).then(response=>{
                    //     this.ruleForm.projName = response.data.bo.projName;
                    //     this.ruleForm.dept = response.data.bo.dept;
                    //     this.ruleForm.version = response.data.bo.version;
                    // });
                }
            },
            //添加附件按钮响应事件
            InsertAppendixClick(){

            },
            //提交
            submitOutSourceAdjust(formName){
                let thiz=this;
                thiz.$refs[formName].validate((valid) => {
                if (valid) {
                    //外包调整类型adjustType为启动资金   业务类型businessType为单次有效 时，必选某个订单号orderNo，其余可不选
                    //判断订单编号是否需要并选中
                    if(thiz.ruleForm.adjustType == '启动资金' && thiz.ruleForm.businessType == '单次有效' && thiz.ruleForm.orderNo == ''){
                        alert('请选择订单编号！');
                    }else{
                        thiz.$epmsDeliveryConfig(thiz, '00011', '/saveOutsourcingAdjust/1', 'POST', thiz.ruleForm,null,"outsourcing").then(response => {
                            thiz.$message({
                                message: response.body.code.msg,
                                type: 'success',
                                duration: 2000
                            });
                        });
                    }
                } else {
                    alert('error submit!!');
                    return false;
                    }
                });
            },
            //保存
            saveOutSourceAdjust(formName){
                let thiz=this;
                thiz.$refs[formName].validate((valid) => {
                if (valid) {
                    //外包调整类型adjustType为启动资金   业务类型businessType为单次有效 时，必选某个订单号orderNo，其余可不选
                    //判断订单编号是否需要并选中
                    if(thiz.ruleForm.adjustType == '启动资金' && thiz.ruleForm.businessType == '单次有效' && thiz.ruleForm.orderNo == ''){
                        alert('请选择订单编号！');
                    }else{
                        thiz.$epmsDeliveryConfig(thiz, '00011', '/saveOutsourcingAdjust/2', 'POST', thiz.ruleForm,null,"outsourcing").then(response => {
                            thiz.$message({
                                message: response.body.code.msg,
                                type: 'success',
                                duration: 2000
                            });

                        });
                    }
                } else {
                    alert('error submit!!');
                    return false;
                    }
                });
            },
            //删除
            deleteOutSourceAdjust(){

            },

        },
        mounted(){

        },
    }
</script>

<style scoped>

</style>