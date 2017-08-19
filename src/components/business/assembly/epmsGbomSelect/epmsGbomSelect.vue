<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="标准G-BOM" name="first"></el-tab-pane>
            <el-tab-pane :disabled="disabled" label="自定义G-BOM" name="second">暂未实现</el-tab-pane>
        </el-tabs>
        <el-row :gutter="30">
            <el-col :span="12">
                <div >
                    <h5>服务产品族＆服务产品＆交付模块</h5>
                    <el-tree :highlight-current="true" class="leftTree" :data="dataLeft" :props="defaultProps" @node-expand="handleNodeExpandLeft" @node-click="handleNodeClickLeft"></el-tree>
                </div>
            </el-col>
            <el-col :span="12">
                <div >
                    <h5>交付场景＆工作包</h5>
                    <el-tree node-key="ccgGbomId" @check-change="handleNodeChangeRight" ref="rightTree" :default-checked-keys="selectIdList" show-checkbox class="leftTree" :data="dataRight" :props="defaultProps" @node-expand="handleNodeExpandRight" @node-click="handleNodeClickRight"></el-tree>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
function deepCopy(source) { 
    debugger
    let result={};
    for (let key in source) {
        result[key] = typeof source[key]==='object'? deepCoyp(source[key]): source[key];
    } 
   return result; 
}
function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i].ccgGbomId == val) {
      arr.splice(i, 1);
      break;
    }
  }
}
export default {
  name: 'epmsGbomSelect',
  props: {
    activeName: {
      type: String,
      default: "first"
    },
    projId: {
      type: String,
      required: true
    },
    deliveryQuantity: {
        type: Number,
        default: 0
    },
    businessModelHeadId: {
        type:String,
        required: true
    }
  },
  data(){
    return {
        //已选择的ID列表
        selectIdList:[],
        //后台返回的ID已选择列表
        selectedGbom:[],
        disabled:true,
        dataLeft: [],
        dataRight:[],
        defaultProps: {
          children: 'children',
          label: 'nameCn'
        },
        //左侧树当前点击对象
        leftTreeCurrentObject:{},
        //完整的GBom对象已选择列表
        selectedObjectList:[]
    }
  },
  watch:{
    'selectedGbom':function(val){
        let thiz = this;        
        let selectedGbom = val.selectedGbom;
        val.selectedGbom.map(item=>{
            if(thiz.selectIdList.indexOf(item) < 0){
                thiz.selectIdList.push(item);
            }
        })
        debugger
        this.$refs.rightTree.setCheckedKeys(this.selectIdList);        
    }
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleNodeClickLeft(data,node,nodeC){
        if(!data.ccgGbomId)
            return;
        let thiz = this;
        let ccgGbomId = data.ccgGbomId;
        let layer = data.layer;
        if(layer == 3){
            let GBomModel = {};
            GBomModel.serviceProductFamily = node.parent.parent.data.ccgGbomId;
            //GBomModel.firstCcgGbomId = node.parent.parent.data.ccgGbomId;
            GBomModel.serviceProductFamilyName = node.parent.parent.data.nameCn;
            GBomModel.serviceProductFamilyNameCn = node.parent.parent.data.nameCn;
            GBomModel.serviceProductFamilyNameEn = node.parent.parent.data.nameEn;
            GBomModel.serviceProductLayer = node.parent.data.ccgGbomId;
            //GBomModel.secondCcgGbomId = node.parent.data.ccgGbomId;
            GBomModel.serviceProductLayerName = node.parent.data.nameCn;
            GBomModel.serviceProductLayerNameCn = node.parent.data.nameCn;
            GBomModel.serviceProductLayerNameEn = node.parent.data.nameCn;
            GBomModel.module = data.ccgGbomId;
            //GBomModel.thirdCcgGbomId = data.ccgGbomId;
            GBomModel.moduleName = data.nameCn;
            GBomModel.moduleNameCn = data.nameCn;
            GBomModel.moduleNameEn = data.nameCn;
            GBomModel.deliveryQuantity = this.deliveryQuantity;
            GBomModel.projId = this.projId;
            GBomModel.remark = '';
            debugger
            this.leftTreeCurrentObject = GBomModel;
            this.dataRight = [];
            this.$epmsDeliveryConfig(this,'00011','/bizmodel/gbom/product?parentId='+ccgGbomId+'&layer=4&businessModelHeadId=0d91bb72-78f2-11e7-b825-0050568b3e4f','GET').then(response=>{
                response.data.bo.map(item=>{
                    item.children=[{}];
                    thiz.dataRight.push(item);
                })                   
            });
        }
      },
      handleNodeExpandLeft(data) {
        if(!data.ccgGbomId)
            return;
        let thiz = this;
        let ccgGbomId = data.ccgGbomId;
        let layer = data.layer;
        if(data.children.length < 2){
            this.dataRight = [];
            if(layer == 1){
                this.$epmsDeliveryConfig(this,'00011','/bizmodel/gbom/product?parentId='+ccgGbomId+'&layer=2&businessModelHeadId=0d91bb72-78f2-11e7-b825-0050568b3e4f','GET').then(response=>{
                    data.children = [];
                    response.data.bo.map(item=>{
                        item.children=[{}];
                        data.children.push(item);
                    })                   
                });
            }
            else if(layer == 2){
                this.$epmsDeliveryConfig(this,'00011','/bizmodel/gbom/product?parentId='+ccgGbomId+'&layer=3&businessModelHeadId=0d91bb72-78f2-11e7-b825-0050568b3e4f','GET').then(response=>{
                    data.children = [];
                    response.data.bo.map(item=>{
                        item.children=[];
                        data.children.push(item);
                    })                   
                });
            }
        }
        console.log(data);
      },
      handleNodeExpandRight(data){
        if(!data.ccgGbomId)
            return;
        let thiz = this;
        let ccgGbomId = data.ccgGbomId;
        let layer = data.layer;
        if(data.children.length < 2){
            if(layer == 4){
                this.$epmsDeliveryConfig(this,'00011','/bizmodel/gbom/product?parentId='+ccgGbomId+'&layer=5&businessModelHeadId='+this.businessModelHeadId,'GET').then(response=>{
                    data.children = [];
                    let datas = [];
                    response.data.bo.map(item=>{
                        item.children=[];
                        item.parentCn = data.nameCn;
                        item.parentEn = data.nameEn;
                        datas.push(item);
                    })
                    data.children = datas; 
                    debugger
                    setTimeout(function(){
                        thiz.selectedGbom = response.data.other;  
                    },100);              
                });
            }
        }
        console.log(data);
      },
      handleNodeClickRight(data) {
          
        console.log(data);
      },
      handleNodeChangeRight(data,isChecked,isChildSelected){
        if(data.layer==5){
            let item = deepCopy(this.leftTreeCurrentObject);
            item.scene = data.ccgParentGbomId;
            item.sceneName = data.parentCn;
            item.sceneNameCn = data.parentCn;
            item.sceneNameEn = data.parentEn;
            item.ccgGbomId = data.ccgGbomId;
            item.workPackage= data.ccgGbomId;
            item.workPackageCode = data.itemCode;
            item.workPackageIsoutsourcing = data.isOutsouring === true ? 1:0;
            item.workPackageName = data.nameCn;
            item.workPackageNameCn = data.nameCn;
            item.workPackageNameEn = data.nameEn;
            item.workPackageUnit = data.unitCn;
            item.workPackageUnitCn = data.unitCn;
            item.workPackageUnitEn = data.unitEn;
            item.businessModelHeadId = this.businessModelHeadId;
            if(isChecked){
                this.selectedObjectList.push(item);
            }
            else{
                let ccgGbomId = data.ccgGbomId;
                removeByValue(this.selectedObjectList,ccgGbomId);
            }
        }
        console.log(data,isChecked,isChildSelected);
      },
      //返回当前选中的数据
      getDatas(){
        return this.selectedObjectList;
      },
      clearData(){
        this.dataRight = [];
      },
      loadData(){
        let thiz = this;
        this.$epmsDeliveryConfig(this,'00011','/bizmodel/gbom/product?parentId=2000&layer=1&businessModelHeadId=0d91bb72-78f2-11e7-b825-0050568b3e4f','GET').then(response=>{
            thiz.dataLeft = [];
            response.data.bo.map(item=>{
                item.children=[{}];
                thiz.dataLeft.push(item);
            })            
        });
      }
  },
  mounted () {
    this.loadData();
  },
  computed: {
  }
}
</script>

<style scoped>
.leftTree{
    overflow-x: hidden;
    overflow-y: scroll;
    height: 400px;
}
</style>

