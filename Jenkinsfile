#!/usr/bin/env groovy
node("EPMS-ESM"){
    try{
        properties([[$class:'GitLabConnectionProperty', gitLabConnection:''], [$class:'RebuildSettings', autoRebuild:false,
            rebuildDisabled:false], [$class:'ThrottleJobProperty', categories:[], limitOneJobWithMatchingParams:false,
            maxConcurrentPerNode:0, maxConcurrentTotal:0, paramsToUseForLimit:'', throttleEnabled:false, throttleOption
            :'project'], 
            parameters([
            string(defaultValue:'10.5.16.54', description:'ESM  OST IP', name:'ESMHOST'),
            string(defaultValue:'8080', description:'ESM PORT', name:'ESMLBPORT'),
            string(defaultValue:'', description:'trigger job name', name:'jobName'),
            string(defaultValue:'', description:'JenkinsFileConfig relative path', name:'configSubFilePath'),
			string(defaultValue:'', description:'Ref', name:'Ref')
            ]),
            pipelineTriggers([])])
        
        println '------------start params------------------'        
        println 'ESMHOST: ' + "${ESMHOST}"
        println 'ESMLBPORT: ' + "${ESMLBPORT}"
        println 'jobName: ' + "${jobName}"
		println 'Ref: ' + "${Ref}"
        println '--------------------------'
        stage("SCM Checkout"){
            checkout scm
        }
        
        def jfConfig = readJSON file: "${env.WORKSPACE}/${configSubFilePath}/JenkinsFileConfig.json"
        def prjAfAccount = "$jfConfig.config.prjAfAccount"
        def prjAfPwd = "$jfConfig.config.prjAfPwd"
        def prjAfUrl= "$jfConfig.config.prjAfUrl"    
        def pomFilePath = ""
        
        if(pomFilePath.equals("$jfConfig.config.pomSubFilePath")){
            pomFilePath = "${env.WORKSPACE}"
        }else{
            pomFilePath ="${env.WORKSPACE}/$jfConfig.config.pomSubFilePath"
        }

        
        //sh "curl -u ${prjAfAccount}:${prjAfPwd} -O $prjAfUrl/$jfConfig.config.pubDir/ver.txt"
        //def v = sh(returnStdout: true, script: 'cat ver.txt').trim()
        
        //docker.image("${jfConfig.config.buildDockerName}").inside(" -v /opt/dockertmp/:/opt/dockertmp/ "){
            withEnv([]) {            
                stage('Build') {
                    sh """
                        cd ${pomFilePath}
                        npm run build -test
                        cd dist
                        #mv $jfConfig.config.msName-$jfConfig.config.jarVersion'.jar' $jfConfig.config.msName'.jar'
						tar -cf  $jfConfig.config.msName'.tar' *
                        curl -u $prjAfAccount:$prjAfPwd -T ${pomFilePath}/dist/$jfConfig.config.msName'.tar' $prjAfUrl/$jfConfig.config.pubDir/$jfConfig.config.jarVersion/$jfConfig.config.msName'.tar'
                    """
                }
            }
        //}
        /*
        docker.image("${jfConfig.config.buildDockerName}").inside(" -v /opt/dockertmp/:/opt/dockertmp/ "){
            stage("Unit Test"){
                try{
                    sh """
                        cd ${pomFilePath} 
                        mvn clean -Dtest=*Test test -DfailIfNoTests=false
                    """
                }finally{
                     def folder = fileExists "$jfConfig.config.pomSubFilePath/target/surefire-reports"
                    if(!folder) {
                        println 'not exist~~~~'
                    }else{
                        println 'preparing upload reports'
                        junit "$jfConfig.config.pomSubFilePath/target/surefire-reports/*.xml"
                    }                  
                    //jacoco(execPattern: "$jfConfig.config.pomSubFilePath/target/jacoco.exec")    
                }
            }
        }
		*/
        /*
        docker.image("${jfConfig.config.buildDockerName}").inside(" -v /opt/dockertmp/:/opt/dockertmp/ "){
            
            stage("Integration Test"){
                try{
                    sh """
                        cd ${pomFilePath}
                        mvn clean -Dtest=*IT test -DfailIfNoTests=false
                    """
                }finally{
                     def folder = fileExists "$jfConfig.config.pomSubFilePath/target/surefire-reports"
                    if(!folder) {
                        println 'not exist~~~~'
                    }else{
                        println 'preparing upload reports'
                        junit "$jfConfig.config.pomSubFilePath/target/surefire-reports/*.xml"
                        jacoco(execPattern: "$jfConfig.config.pomSubFilePath/target/jacoco.exec") 
                    }
                }    
            }
        }
		 */
		 
        /*
        docker.image("docker.zte.com.cn:5000/10207653/yun-sonar-runner:1.0").inside("-v $pomFilePath:/opt/dockertmp/ "){
            withEnv([]) {            
                stage('Check') {
                    sh """
                        cd $pomFilePath
                        sonar-runner
                    """
                }
            }
        }
        */
        /*
        stage("Sonar"){                
            dir("${pomFilePath}") {
                // requires SonarQube Scanner 2.8+
                def sonarHome = tool 'Sonar-Scanner';
                withSonarQubeEnv('SonarQube-Server') {
                    sh "${sonarHome}/bin/sonar-scanner"
                }
            }
        }*/

        withEnv(['profiles_active=dev']) {
            stage('Image') {
                sh """
					env
                    cd ${pomFilePath}/CI-build/docker/app
                    rm -rf dist
					mkdir dist
                    curl -u ${prjAfAccount}:${prjAfPwd} -O $prjAfUrl/$jfConfig.config.pubDir/$jfConfig.config.jarVersion/$jfConfig.config.msName'.tar'
					tar -xf $jfConfig.config.msName'.tar' -C dist
                    docker build -t apphub.zte.com.cn/$jfConfig.config.msArea/$jfConfig.config.msSystem/$jfConfig.config.msName:${jfConfig.config.imageVersion}.${BUILD_NUMBER} -f ./dockerfile .
                    docker push apphub.zte.com.cn/$jfConfig.config.msArea/$jfConfig.config.msSystem/$jfConfig.config.msName:${jfConfig.config.imageVersion}.${BUILD_NUMBER}
					docker rmi apphub.zte.com.cn/$jfConfig.config.msArea/$jfConfig.config.msSystem/$jfConfig.config.msName:${jfConfig.config.imageVersion}.${BUILD_NUMBER}
                """
            }
        }
        
		stage('Deploy') {
                
                //¸üÐÂ¾µÏñ°æ±¾
                sh """
                    python ./$jfConfig.config.pomSubFilePath/upload_download_atricator.py -u ${prjAfAccount} -p ${prjAfPwd} -s ${jfConfig.config.msName} -v ${jfConfig.config.imageVersion}.${BUILD_NUMBER} -t download -c $pomFilePath/CI-build/deploy/docker-compose.yml
                    cat $pomFilePath/CI-build/deploy/docker-compose.yml
                """
                def esmAccessKey = '1CDB68077A2C1D5D57B5'
                def esmSecretKey = 'BQh7UDsbiYWBXnN85p8rUx5ju9hpiLPnDQPUT3M4'
                def esmApiUrl = 'http://test.esm.zte.com.cn/v2-beta/projects/1a5'
                def appStackName = "$jfConfig.config.appStackName"
                sh """
                    cd $pomFilePath/CI-build/deploy/        
                    chmod a+x $pomFilePath/CI-build/deploy/esm-compose
                    chmod a+x $pomFilePath/CI-build/deploy/esmApiStopService.sh
                    
                    export esmAccessKey='1CDB68077A2C1D5D57B5'
                    export esmSecretKey='BQh7UDsbiYWBXnN85p8rUx5ju9hpiLPnDQPUT3M4'
                    export esmApiUrl='http://test.esm.zte.com.cn/v2-beta/projects/1a5'
                    export appStackName="$jfConfig.config.appStackName"                    

                    awk -F: '/^[a-zA-Z]/{{system("sh esmApiStopService.sh " \$1)}}' docker-compose.yml

                    #${pomFilePath}/CI-build/deploy/esm-compose --url http://test.esm.zte.com.cn/ --access-key 1CDB68077A2C1D5D57B5 --secret-key BQh7UDsbiYWBXnN85p8rUx5ju9hpiLPnDQPUT3M4 -p $jfConfig.config.appStackName stop
                    #for i in \$(seq 1 20); do echo 'sleep countdown to wait esm stop stack:'\$((20-\$i)); sleep 1; done;
                    #${pomFilePath}/CI-build/deploy/esm-compose --url http://test.esm.zte.com.cn/ --access-key 1CDB68077A2C1D5D57B5 --secret-key BQh7UDsbiYWBXnN85p8rUx5ju9hpiLPnDQPUT3M4 -p $jfConfig.config.appStackName rm
                    #for i in \$(seq 1 20); do echo 'sleep countdown to wait esm stop stack:'\$((10-\$i)); sleep 1; done;                    
                    ${pomFilePath}/CI-build/deploy/esm-compose --url http://test.esm.zte.com.cn/ --access-key 1CDB68077A2C1D5D57B5 --secret-key BQh7UDsbiYWBXnN85p8rUx5ju9hpiLPnDQPUT3M4 -p $jfConfig.config.appStackName up -d -confirm-upgrade --force-recreate
                    for i in \$(seq 1 60); do echo 'sleep countdown to wait esm stop stack:'\$((80-\$i)); sleep 1; done;
                """
            }
        /*stage('trigger integration pipeline'){
            build job: "${jobName}", parameters: [string(name: 'ESMHOST', value: ESMHOST), string(name: 'ESMLBPORT', value: ESMLBPORT), 
               string(name: 'UpstreamTrigger', value: "$jfConfig.config.msName"),
               string(name: 'UpstreamTriggerImageVersion', value: "${jfConfig.config.imageVersion}.${BUILD_NUMBER}")], quietPeriod: 0, wait: false    
        }*/
    }
    finally{        
    }
}
