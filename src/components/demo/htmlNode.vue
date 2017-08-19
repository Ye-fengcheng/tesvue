
<script>
  let tablePane = null;
  export default {
      template:'<div>'+
    '<h3 class="panel-title">交付配置评审记录</h3>'+
    '<br/>'+
    '<el-progress style="width:150px" ref="pre" :text-inside="true" :stroke-width="18" :percentage="70"></el-progress><el-button @click="checked = true" type="primary" ref="btn">主要按钮</el-button>  <el-checkbox @change="change"	 ref="check" v-model="checked">备选项</el-checkbox>'+
    '<div ref="reTable">'+
    '</div>'+
  '</div>',
    data() {
      return {
          input:'ddd',
          checked:false
      };
    },
    beforeCreate() {
        
    },
    methods : {
        doSomething(){
            alert('d')
        },
        change(e){
             alert('d')
        }
    },
    mounted () {      
        var dataModel = new ht.DataModel(),
        graphView = new ht.graph.GraphView(dataModel),
        view = graphView.getView();
        graphView.setEditable(true);
        debugger
                var node = new ht.HtmlNode();
                node.setPosition(200, 100);
                node.setHtml(this.$refs.pre.$el);
                dataModel.add(node);

                var style = graphView.getView().style;
                style.left = '0';
                style.top = '0';
                style.right = '0';
                style.bottom = '0';
                document.body.appendChild(graphView.getView());            
    }
  };
</script>

<style scoped>
.textCenter{
    text-align: center
}
</style>