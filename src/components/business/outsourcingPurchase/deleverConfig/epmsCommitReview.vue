<template>
    <div class="epmsCommitReview" >
        <el-breadcrumb class="breadcrumb" separator=">">
            <el-breadcrumb-item :to="{ path: '/epmsFrame/epmsDeliverConfig/epmsDeliverConfig/'+ $store.state.deliverConfigBo.projId }">交付配置 </el-breadcrumb-item>
            <el-breadcrumb-item>提交评审</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs ref="tabs"  v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="制作业务模型" name="first"></el-tab-pane>
            <el-tab-pane label="成本区域关联业务模型" name="second"></el-tab-pane>
            <el-tab-pane label="提交评审" name="third"></el-tab-pane>
        </el-tabs>
        <div class="commitInfo">
            <div>
                <el-row type="flex" justify="center">
                    <el-col :span="4" ><div >交付配置编号：</div></el-col>
                    <el-col :span="4"><div >{{bo.deliveryConfigNo}}</div></el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="4" ><div >版本号：</div></el-col>
                    <el-col :span="4"><div >{{bo.version}}</div></el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="4"><div >创建人：</div></el-col>
                    <el-col :span="4"><div >{{bo.createUser}}</div></el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="4" ><div >创建时间：</div></el-col>
                    <el-col :span="4"><div >{{bo.createDate}}</div></el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="4" ><div >提交人：</div></el-col>
                    <el-col :span="4"><div >{{bo.updateUser}}</div></el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="8" ><div ><hr></div></el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="8" ><div ><el-button  @click="checkConfigurationDetail()">查看配置明细</el-button>
                    <el-button type="primary" @click="commitReview()">提交评审</el-button></div></el-col>
                </el-row>
                
            </div>
        </div>

       
    </div>
</template>

<script>
    export default{
        data(){
            return{
                bo: this.$store.state.deliverConfigBo,
                activeName:'third'
                // deliveryConfigurationNum:'JF30170711028',
                // version:'V2.0',
                // creater:'张三12345678',
                // createTime:'2017/8/1',
                // committer:'张三12345678',

            };
        },
        methods:{
            handleClick(tab,event){
                switch(tab.name){
                    case "first" :
                        this.$router.push({ path : '/epmsFrame/epmsDeliverConfig/epmsCreateBusinessModel'})
                    break;
                    case "second" :
                        this.$router.push({ path : '/epmsFrame/epmsDeliverConfig/epmsCostToBusinessModel'})
                    break;
                }
                console.log(tab, event);
            },
            checkConfigurationDetail(){
                this.$router.push({ path : '/epmsFrame/epmsDeliverConfig/epmsDeliveryConfigDetail/'+this.bo.deliveryConfigId});
            },
            commitReview(){//提交评审
                let thiz = this;
                this.$epmsDeliveryConfig(this,'00011','/audits/submit/'+this.bo.deliveryConfigId,'POST',{},null).then(response=>{
                    thiz.$router.push({ path : '/epmsFrame/epmsDeliverConfig/epmsDeliverConfig/'+thiz.bo.projId});
                }); 
            }
        },
        mounted () {
            let tab = this.$refs.tabs.$el.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
            tab.style.left = '50%';
            tab.style.marginLeft = '-178px';
        }
    }
</script>

<style scoped>
    .breadcrumb{
        font-size: 14px;
        margin-bottom: 0px
    }
    .el-row {
        margin-bottom: 20px;
    }
    .commitInfo{
        padding-top: 30px;
    }

</style>