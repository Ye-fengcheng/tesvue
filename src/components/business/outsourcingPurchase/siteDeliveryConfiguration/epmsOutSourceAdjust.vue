<template>
    <div class="epmsOutSourceAdjust">
        <h3 >外包额度调整</h3></br>
        <!---->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="122px" label-position="right">
            <el-form-item  >
                <el-col :span="12">
                    <el-form-item label="单据编号" prop="documentCode">
                        <div>{{documentCode}}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="单据状态" prop="documentStatus">
                        <div>{{documentStatus}}</div>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item  >
                <el-col :span="6">
                    <el-form-item label="项目编号" prop="projectID">
                        <el-select placeholder="请选择项目编号" v-model="projectID" @change="projectIDchange">
                            <el-option 
                                v-for="item in projectIDOptions"
                                :key="item.code"
                                :label="item.label"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="项目名称" prop="projectName">
                        <div>{{projectName}}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="版本号" prop="versionID">
                        <div>{{versionID}}</div>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item  >
                <el-col :span="6">
                    <el-form-item label="项目类型" prop="projectType">
                        <el-select placeholder="请选择项目类型" v-model="ruleForm.projectType">
                            <el-option label="工程" value="project"></el-option>
                            <el-option label="服务" value="service"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="代表处" prop="representativeOffice">
                        <div>{{representativeOffice}}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="业务类型" prop="businessType">
                        <el-select placeholder="请选择业务类型" v-model="ruleForm.businessType">
                            <el-option label="单次有效" value="singleEffective"></el-option>
                            <el-option label="滚动有效" value="scrollEffective"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item  >
                <el-col :span="6">
                    <el-form-item label="订单编号" prop="orderNum">
                        <el-input v-model="ruleForm.orderNum"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="生效日期" prop="effectiveDate">
                        <div>{{effectiveDate}}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="外包调整类型" prop="outSourcingAdjustType">
                        <el-select placeholder="请选择外包调整类型" v-model="ruleForm.outSourcingAdjustType">
                            <el-option 
                                v-for="item in outSourcingAdjustTypeOptions"
                                :key="item.code"
                                :label="item.label"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item  >
                <el-col :span="6">
                    <el-form-item label="人员租赁金额" prop="personalLeasingAmount">
                        <el-input v-model="ruleForm.personalLeasingAmount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="工程外包金额" prop="projectOutSourcingAmount">
                        <el-input v-model="ruleForm.projectOutSourcingAmount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="外包调整总金额" prop="outSourcingAdjustTotalAmount">
                        <el-input v-model="ruleForm.outSourcingAdjustTotalAmount"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item  >
                <el-col :span="6">
                    <el-form-item label="币种" prop="currency">
                        <div>{{currency}}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="外包调整有效期" prop="outSourcingAdjustValidity">
                        <el-select placeholder="请选择外包调整有效期" v-model="ruleForm.outSourcingAdjustValidity">
                            <el-option label="一个月" value="oneMonth"></el-option>
                            <el-option label="持续有效" value="persistentEffective"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="有效期至" prop="deadline">
                        <div>{{deadline}}</div>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item  >
                <el-col :span="6">
                    <el-form-item label="创建人" prop="creater">
                        <div>{{creater}}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="提交人" prop="committer">
                        <div>{{committer}}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    
                </el-col>
            </el-form-item>

            <el-form-item  >
                <el-col :span="18">
                    <el-form-item label="备注" prop="comment">
                        <el-input type="textarea" v-model="ruleForm.comment">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-col :span="18">
                    <el-form-item label=" ">
                        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-form-item>

        </el-form>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                documentCode:'dfgdegfgh',//单据编号
                documentStatus:'gdghe',//单据状态
                projectName:'gtar',//项目名称
                versionID:'tgar',//版本号
                representativeOffice:'rtgae',//代表处
                effectiveDate:'gare',//生效日期
                currency:'美金',//币种
                deadline:'gare',//有效期至
                creater:'gaerg',//创建人
                committer:'gaerg',//提交人

                projectIDOptions:[],//项目编号选项
                projectTypeOptions:[],//项目类型选项
                businessTypeOptions:[],//业务类型选项
                outSourcingAdjustTypeOptions:[],//外包调整类型选项
                outSourcingAdjustValidityOptions:[],//外包调整有效期选项
                ruleForm:{
                    projectID:'',//项目编号
                    projectType:'',//项目类型
                    businessType:'',//业务类型
                    orderNum:'',//订单编号
                    outSourcingAdjustType:'',//外包调整类型
                    personalLeasingAmount:'',//人员租赁金额
                    projectOutSourcingAmount:'',//工程外包金额
                    outSourcingAdjustTotalAmount:'',//外包调整总金额
                    outSourcingAdjustValidity:'',//外包调整有效期
                    comment:'',//备注
                },
                rules:{
                    projectID:[{required:true,message:'请选择项目编号',trigger:'blur'}],
                    projectType:[{required:true,message:'请选择项目类型',trigger:'blur'}],
                    outSourcingAdjustType:[{required:true,message:'请选择外包调整类型',trigger:'blur'}],
                    outSourcingAdjustValidity:[{required:true,message:'请选择外包调整有效期',trigger:'blur'}]
                }
            }
        },
        methods:{
            projectIDchange(val){//选择项目编号
                // if(!val)
                // return;
                // let thiz = this;
                // let language = this.$i18n.locale === 'zh' ? "zh-CN":"en-US";
                // this.$epmsHttp(this,'00011','/common/types/network/'+val+'?language='+language,'GET').then(response=>{
                //     thiz.networkTypeOptions = response.data.bo;
                // }); 
            },
            loadProjectID(){//加载项目编号

            },
            submitForm(formName){//提交表单
                
            },
            resetForm(formName){//重置表单
                this.$refs[formName].resetFields();
            },
            
        },    
        mounted () {
            // let projId = this.$store.state.deliverConfigBo.projId;
            // if(!projId)
            //     return false;
            this.loadProjectID();
            
        }
        
    }
</script>
<style scoped>

</style>