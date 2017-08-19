<template>
    <div class="epmsFrame">
        <div>
            <epmsFrameNav>
                <el-button slot="project-left" type="primary">项目切换</el-button>
            </epmsFrameNav>
        </div>
        <div>
            <div ref="lm" style="max-width:180px;margin-top:50px;">
                <el-col :span="24" class="leftMenu" ref="leftMenu">
                    <el-menu :unique-opened="uniqueOpened" :default-openeds="defaultOpeneds" :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="$store.state.isCollapse" theme="dark">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-message"></i>
                                <span slot="title">与我有关</span>
                            </template>
                            <el-menu-item index="/epmsFrame/epmsDeliverConfig/epmsDeliveryConfigReview">待我审批</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">成本预算</span>
                        </el-menu-item>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-message"></i>
                                <span slot="title">外包采购</span>
                            </template>
                            <el-menu-item index="deliverConfigPath">交付配置</el-menu-item>
                            <el-menu-item index="/epmsFrame/epmsDeliverConfig/epmsCreateBusinessModel">制作交付配置</el-menu-item>
                            <el-menu-item index="/epmsFrame/epmsSiteDeliverConfig/epmsSiteDeliverConfigInfo">站点交付配置</el-menu-item>
                            <el-menu-item index="3-3">G & P</el-menu-item>
                            <el-menu-item index="3-4">采购</el-menu-item>
                            <el-menu-item index="3-5">派工</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="4">
                            <i class="el-icon-menu"></i>
                            <span slot="title">物料资产</span>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <i class="el-icon-menu"></i>
                            <span slot="title">收入</span>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <i class="el-icon-menu"></i>
                            <span slot="title">工程文档</span>
                        </el-menu-item>
                        <el-menu-item index="7">
                            <i class="el-icon-menu"></i>
                            <span slot="title">质量安全</span>
                        </el-menu-item>
                        <el-menu-item index="8">
                            <i class="el-icon-menu"></i>
                            <span slot="title">人力资源</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </div>
            <div style="padding: 20px 15px 10px 20px;overflow: hidden; ">
                <router-view ref="main"></router-view>
            </div>
        </div>
    </div>
</template>

<script> 
export default {
    data() {
        return {
            activeIndex: '1',
            uniqueOpened: true,
            defaultOpeneds: []
        };
    },
    watch: {
        '$store.state.isCollapse': function (val) {
            this.responseLayout(val);
        },
        '$store.state.scrollHeight': function (val) {
            this.$refs.leftMenu.$el.style.height = val + "px";
        }
    },
    mounted() {
        this.responseLayout(this.$store.state.isCollapse);
        let thiz = this;
    },
    methods: {
        responseLayout(val) {
            if (val) {
                this.$refs.lm.style.maxWidth = '56px';
            }
            else {
                this.$refs.lm.style.maxWidth = '180px';
            }
        },
        handleSelect(key, keyPath) {
            let projId = !this.$store.state.deliverConfigBo.projId ? 'myproj_test': this.$store.state.deliverConfigBo.projId
            if(key == "deliverConfigPath")
                this.$router.push({ path: '/epmsFrame/epmsDeliverConfig/epmsDeliverConfig/'+ projId})
            else
                this.$router.push({ path: key })
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style>
.leftMenu {
    min-height: 100%;
}

.leftMenu ul {
    min-height: 100%;
}
</style>