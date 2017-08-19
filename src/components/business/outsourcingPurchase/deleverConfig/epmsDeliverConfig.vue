<template>
  <div>
      <div ref="topDiv" >
          <epmsPanel headText="正在制作的交付配置" ref="panel">
            <el-row slot="panelBody">
                <el-col :span="12" v-if="!!bo.deliveryConfigId">
                    <div class="grid-content bg-purple">
                        <el-row>
                            <el-col :span="6"><div class="grid-content bg-purple">交付配置编号：</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple-light">{{bo.deliveryConfigNo}}</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple">版本号：</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple-light">{{bo.version}}</div></el-col>
                        </el-row>
                        <br/>
                        <el-row>
                            <el-col :span="6"><div class="grid-content bg-purple">创建人：</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple-light">{{bo.createUser}}</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple">更新人：</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple-light">{{bo.updateUser}}</div></el-col>
                        </el-row>
                        <br/>
                        <el-row>
                            <el-col :span="6"><div class="grid-content bg-purple">创建时间：</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple-light">{{bo.createDate}}</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple">更新时间：</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple-light">{{bo.updateDate}}</div></el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="12" v-if="!!bo.deliveryConfigId">
                    <div class="grid-content bg-purple-light">
                        <el-row>
                            <el-col :span="10">&nbsp;</el-col>
                            <el-col :span="9">&nbsp;</el-col>
                            <el-col :span="5">
                                <div class="textCenter">
                                    <p></p>
                                    <p>
                                        <button type="button" class="btn btn-link" @click="exportConfig" aria-label="Left Align">
                                            <span class="glyphicon glyphicon-save" aria-hidden="true"></span>导出配置
                                        </button>
                                    </p>
                                    <p><el-button @click="updateConfig" v-if="bo.status === 0" type="primary">继续配置</el-button></p>
                                    <p><el-button v-if="bo.status === 1 || bo.status === 2" @click="configDetail" type="primary">查看配置</el-button></p>
                                    <p><el-button v-if="bo.status === 1" type="primary" @click="configRevoke">撤销审批</el-button></p>
                                    <p><el-button v-if="bo.status === 3" type="primary" @click="configModify">变更配置</el-button></p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="24" v-if="!bo.deliveryConfigId">
                    <div class="grid-content bg-purple">
                        <el-row>
                            <el-col :span="24"><div class="textCenter"><i @click="addConfig" style="font-size:40px" class="el-icon-plus"></i><br/><h3>点击此处创建一个新版本的交付配置</h3></div></el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
          </epmsPanel>
          <h3 class="panel-title">交付配置评审记录</h3>
          <br/>
          <div ref="reTable">

          </div>
      </div>
  </div>
</template>
<script>
  let tablePane = null;
  export default {
    data() {
      return {
          bo: this.$store.state.deliverConfigBo
      };
    },
    watch:{
        '$store.state.isCollapse': function(val){
            tablePane.setWidth(this.$refs.panel.$el.clientWidth)
        }
    },
    methods: {
        //添加交付配置
        addConfig(){
            let thiz = this;
            thiz.$epmsDeliveryConfig(thiz,'00011','','POST',{},{ headers:{ projectId : thiz.$store.state.deliverConfigBo.projId }}).then(response=>{
                thiz.$router.push({ path : '/epmsFrame/epmsDeliverConfig/epmsCreateBusinessModel'});
                thiz.$store.commit({
                    type: 'setSeliverConfigBo',
                    data: response.data.bo
                });
            });
        },
        //变更配置
        configModify(){
            let thiz = this;            
            this.$epmsDeliveryConfig(this,'00011','/update','PUT',{ deliveryConfigId: this.$store.state.deliverConfigBo.deliveryConfigId ,  version: this.$store.state.deliverConfigBo.version}).then(response=>{
                debugger
                thiz.bo.status = response.data.bo.status;
                thiz.bo.version = response.data.bo.version;
                thiz.$store.commit({
                    type: 'setSeliverConfigBo',
                    data: thiz.bo
                });
                thiz.$router.push({ path : '/epmsFrame/epmsDeliverConfig/epmsCreateBusinessModel'});
            });
            
        },
        //查看交付配置
        configDetail(){
            this.$router.push({path : '/epmsFrame/epmsDeliverConfig/epmsDeliveryConfigDetail/'+this.$store.state.deliverConfigBo.deliveryConfigId})
        },
        exportConfig(){
            let thiz = this;
            this.$epmsDeliveryConfig(this,'00011','/export/'+ this.$store.state.deliverConfigBo.deliveryConfigId +'/'+ this.$store.state.deliverConfigBo.deliveryConfigNo +'/zh_CN/测试项目名称/2017-8-8','GET').then(response=>{
                thiz.$message({
                    showClose: true,
                    message: '导出成功',
                    type: 'success',
                    duration: 2000
                });
            });   
        },
        exportDiffConfig(version){
            let thiz = this;
            this.$epmsDeliveryConfig(this,'00011','/exportdiff/'+ this.$store.state.deliverConfigBo.deliveryConfigId +'/'+ version +'/' + this.$store.state.deliverConfigBo.deliveryConfigNo +'/zh_CN/测试项目名称/2017-8-8','GET').then(response=>{
                thiz.$message({
                    showClose: true,
                    message: '导出成功',
                    type: 'success',
                    duration: 2000
                });
            });   
        },
        //更新交付配置
        updateConfig(){
            let thiz = this;            
            /* this.$epmsDeliveryConfig(this,'00011','/update','PUT',{ deliveryConfigId: this.$store.state.deliverConfigBo.deliveryConfigId }).then(response=>{
                debugger
                thiz.bo.status = response.data.bo.status;
                thiz.$store.commit({
                    type: 'setSeliverConfigBo',
                    data: response.data.bo
                });
            }); */
            thiz.$router.push({ path : '/epmsFrame/epmsDeliverConfig/epmsCreateBusinessModel'});
        },
        //撤销评审
        configRevoke(){
            let thiz = this;
            this.$confirm('您是否确定要撤销?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                thiz.$epmsDeliveryConfig(thiz,'00011','/audits/cancel/'+this.$store.state.deliverConfigBo.deliveryConfigId,'POST',{ }).then(response=>{
                    thiz.$message({
                        showClose: true,
                        message: response.body.code.msg,
                        type: 'success',
                        duration: 2000
                    });
                    thiz.bo.status = 0;
                    thiz.$store.commit({
                        type: 'setSeliverConfigBo',
                        data: thiz.bo
                    })
                });
            //    tablePane.removeFromDOM();
            //    tablePane = null;
            //   this.loadDeliverConfigInfo(this.$route.params.projectId);
            }).catch(() => {
            });
        },
        //加载交付配置基本信息
        loadDeliverConfigInfo(projectId){
            let thiz = this;
            this.$epmsDeliveryConfig(this,'00011','/'+projectId,'GET').then(response=>{
                if(response.data.bo.length==0){
                    thiz.bo = {
                        deliveryConfigId:'',
                        deliveryConfigNo:'',
                        version:'',
                        //状态(0:编辑中;1:待评审;2:评审中;3:已生效)
                        status:3,
                        projId:thiz.$route.params.projectId,
                        seqNum:'',
                        enableFlag:'',
                        createUser:'',
                        createDate:'',
                        updateUser:'',
                        updateDate:'',
                        deleteUser:'',
                        deleteDate:null
                    }
                }
                else{
                    thiz.bo = response.data.bo[0];
                }                
                thiz.$store.commit({
                    type: 'setSeliverConfigBo',
                    data: thiz.bo
                })
                
                if(!!thiz.$store.state.deliverConfigBo.deliveryConfigId){
                    thiz.$epmsDeliveryConfig(thiz,'00011','/audits/'+projectId+'/'+thiz.$store.state.deliverConfigBo.deliveryConfigId,'GET').then(response=>{
                        thiz.loadDeliveryconfigAudits(response.data.bo);
                    });
                }
            });
        },
        //加载交付配置评审记录
        loadDeliveryconfigAudits(bos){
            let thiz = this;
            tablePane = new ht.ui.TablePane();
            let table = tablePane.getTableView();
            let tableHeader = tablePane.getTableHeader();
            let dataModel = table.getDataModel();
            let columnModel = table.getColumnModel();

            tablePane.setBorder(new ht.ui.border.CSSBorder(1, '#dfe6ec', 'solid'))
            tableHeader.setPreferredSize(100,42);//设置表头的高，第一个宽无效
            tableHeader.setBackground('#eef1f6')
            
            let datas = bos;
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
            //tablePane.getTableView().setCheckMode('all'); //设置有全选模式

            let column = new ht.ui.Column();
            column.setName('num');
            column.setDisplayName('序号');
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('version');
            column.setDisplayName('版本号');
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('createUser');
            column.setAccessType('attr');
            column.setDisplayName('提交人');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('createDate');
            column.setAccessType('attr');
            column.setDisplayName('提交时间');
            columnModel.add(column);            

            column = new ht.ui.Column();
            column.setName('reviewUser');
            column.setDisplayName('审批人');
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('updateDate');
            column.setDisplayName('审批时间');
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('reviewOpinions');
            column.setDisplayName('审批意见');
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('reviewResult');
            column.setDisplayName('审批结论');
            column.setAccessType('attr');
            column.formatValue = function (value) {
                //0:未审批;1:通过;2:不通过;
                let text = '';
                if(value==0)
                    text ='未审批';
                else if(value==1)
                    text ='通过';
                else if(value==2)
                    text ='不通过';
                return text;
            };
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setDisplayName('操作');
            column.setAccessType('attr');
            column.setWidth(1000);
            columnModel.add(column);
            column.drawCell = function (g, data, selected, column, x, y, width, height) {
                let btn =document.createElement("a");
                btn.type = "button";
                btn.innerHTML = "导出配置";
                btn.setAttribute("class","btn btn-link");
                btn.addEventListener('click', function(e) {
                    thiz.exportDiffConfig(data.a('version'));
                });
                return btn;
            };
            tablePane.addToDOM(this.$refs.reTable,{width: this.$refs.panel.$el.clientWidth,height:480});
            setTimeout(function(){
                tablePane.setWidth(thiz.$refs.panel.$el.clientWidth)
            });
        }
    },
    mounted () {              
        this.loadDeliverConfigInfo(this.$route.params.projectId);
    },
    destroyed (){
        tablePane.removeFromDOM();
    }
  };
</script>

<style scoped>
.textCenter{
    text-align: center
}
</style>