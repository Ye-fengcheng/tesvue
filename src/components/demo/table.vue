<template>
  <div>
    <h3 class="panel-title">交付配置评审记录</h3>
    <br/>
    <div ref="reTable">
    </div>
  </div>
</template>
<script>
  let tablePane = null;
  export default {
    data() {
      return {
      };
    },
    methods: {
        //加载交付配置基本信息
        loadDeliverConfigInfo(projectId){
            let thiz = this;
            this.$epmsHttp(this,'00011','/deliveryconfig/myproj_test','GET').then(response=>{
                debugger
                if(response.body.code.code === '0000'){
                    thiz.bo = response.data.bo[0];
                    thiz.$epmsHttp(thiz,'00011','/deliveryconfig/audits/myproj_test/20170727112314','GET').then(response=>{
                        thiz.loadDeliveryconfigAudits(response.data.bo);
                    },response=>{
                        debugger
                    });
                }
                else
                {
                    Vue.$message({
                        showClose: true,
                        message: response.body.code.msg,
                        type: 'error',
                        duration: 2000
                    });
                }
            },response=>{
                thiz.$message({
                    showClose: true,
                    message: '请求出错',
                    type: 'error',
                    duration: 2000
                });  
            });
        },
        //加载交付配置评审记录
        loadDeliveryconfigAudits(bo){
            let thiz = this;
            tablePane = new ht.ui.TablePane();
            let table = tablePane.getTableView();
            let tableHeader = tablePane.getTableHeader();
            let dataModel = table.getDataModel();
            let columnModel = table.getColumnModel();
            
            tableHeader.setPreferredSize(100,42);//设置表头的高，第一个宽无效
            tableHeader.setBackground('#20a0ff')
            
            let datas = bo;
            debugger
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
            column.setDisplayName('审批状态');
            column.setAccessType('attr');
            column.formatValue = function (value) {
                //0:编辑中;1:待评审;2:评审中;3:已生效
                let text = '';
                if(value==0)
                    text ='编辑中';
                else if(value==1)
                    text ='待评审';
                else if(value==2)
                    text ='评审中';
                else if(value==3)
                    text ='已生效';
                return text;
            };
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setDisplayName('操作');
            column.setAccessType('attr');
            columnModel.add(column);
            column.drawCell = function (g, data, selected, column, x, y, width, height) {
                let btn =document.createElement("button");
                btn.type = "button";
                btn.innerHTML = "导出配置";
                btn.setAttribute("class","btn btn-link");
                btn.addEventListener('click', function(e) {
                    debugger
                    console.log(data);
                });
                return btn;
            };
            //table.setSelectLabelColor('#fff');
            table.drawRowBackground = function (drawable, x, y, width, height, data) {
                let g = table.getRootContext();
                if (table.isSelected(data)) {
                    g.fillStyle = '#87A6CB';
                }
                /* else if (table.getRowIndex(data) % 2 === 0) {
                    g.fillStyle = '#F1F4F7';
                } */
                else {
                    g.fillStyle = '#FFF';
                }
                g.beginPath();
                g.rect(x, y, width, height);
                g.fill();
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
        tablePane = null;
    }
  };
</script>

<style scoped>
.textCenter{
    text-align: center
}
</style>