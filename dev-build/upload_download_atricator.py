# -*- coding: UTF-8 -*-

import sys
import getopt
import os
import os.path
import codecs
import json


def download_file_from_artifactory(parameMap,arryArtifactorys,artifactory_url):
    arryServer_Name=str(parameMap.get("SERVER_NAME")).split(",")
    print arryArtifactorys
    if len(arryServer_Name)==0:
        return
	'''
	for item in arryArtifactorys:
        find_server = False
        for item_server in arryServer_Name:
            if str(item["msname"])==str(item_server):
                find_server = True
                break
        if not find_server:
            url = artifactory_url + str(item["artifactor"][0]["target"]) +str(item["artifactor"][0]["pattern"])
            command="curl  -O -u " + parameMap.get("USER") +":"+parameMap.get("PWD") +"  -X GET " + url
            print "command--> " + command
            os.system(command)
            #file_path=sys.path[0] + "/ver.txt"
            file_path=sys.path[0] + "/" + str(item["artifactor"][0]["pattern"])
            item["version"]=readDetail(file_path)
    '''
    if os.path.exists(parameMap.get("COMPONSE_PATH")):
        generate_componse_file(parameMap.get("COMPONSE_PATH"),arryArtifactorys)
    pass

#读取配置文件，获取服务和制品列表
def readConfig(server_name,version):
    fileDetail=readDetail(sys.path[0]+ "/JenkinsFileConfig.json")
    if fileDetail=="":
        return  fileDetail
    jsonObject= json.loads(fileDetail)
    arryList=jsonObject["artifactors"]
    arryServer_Name = str(server_name).split(",")
    if len(arryServer_Name) == 0:
        return arryList

    for item in arryList:
        for item_server in arryServer_Name:
            #if str(item["msname"]) == str(item_server):
                item["version"] = version
                break
    return arryList
    pass

def readDetail(file_path):
    fileDetail = ""
    if os.path.exists(file_path):
        file_object = codecs.open(file_path, 'r')
        try:
            fileDetail = file_object.read()
        finally:
            file_object.close()
    return fileDetail

def writeDetail(file_path,fileDetail):
    print 'file_path-->' + file_path
    file_object = codecs.open(file_path, 'w')
    try:
        file_object.write(fileDetail)
    finally:
        file_object.close()
    pass

#生成componse文件
def generate_componse_file(file_path,arryArtifactorys):
    fileDetail=readDetail(file_path)
    if fileDetail=="":
        return
    for item in arryArtifactorys:
        fileDetail = fileDetail.replace("$$" + str(item["msname"])+"_v$$", str(item["version"]))
    # rewrite the componse file
    writeDetail(file_path, fileDetail)
    pass

#上传文件到制品库
def upload_file_to_artifactory(parameMap,arryArtifactorys,artifactory_url):

    arryServer_Name = str(parameMap.get("SERVER_NAME")).split(",")
    if len(arryServer_Name) == 0:
        return    
    for item in arryArtifactorys:
        find_server = False
        for item_server in arryServer_Name:
            if str(item["msname"]) == str(item_server):
                find_server = True
                break
        if find_server:
            print 'artifactor-->' + str(item["artifactor"][0]["pattern"])
            writeDetail(sys.path[0] + "/" + str(item["artifactor"][0]["pattern"]), parameMap.get("VERSION"))
            url = artifactory_url + str(item["artifactor"][0]["target"])
            command = "curl -u '" + parameMap.get("USER") + ":" + parameMap.get("PWD") \
                      + "'  -T '" + sys.path[0] + "/" + str(item["artifactor"][0]["pattern"]) + "'  '" + url \
                      + "/" + str(item["artifactor"][0]["pattern"]) + "'"
            print 'command--->'+command
            os.system(command)
            find_server=False
    pass

#设置参数列表
def getParamentMap(opts,args):
    for op, arg in opts:
        if "-h" == op:
            print("参数列表：")
            print("-h:显示帮助")
            print("-u:制品库用户名 ")
            print("-p:制品库密码")
            print("-s:服务名称，多个服务名称用,分隔")
            print("-v:版本号")
            print("-t:类型:upload/download")
            print("-c:类型为download是，表示componse.yml文件路径")
            sys.exit(0)
        else:
            if "-u" == op:
                user = arg
            if "-p" == op:
                pwd = arg
            if "-s" == op:
                server_name_all = arg
            if "-v" == op:
                version = arg
            if "-t" == op:
                type = arg
            if "-c" == op:
                componse_path = arg

    print "user -->" + user
    print "pwd -->" + pwd
    print "server_name_all -->" + server_name_all
    print "version -->" + version
    print "type -->" + type
    #print "componse_path -->" + componse_path

    parameMap = {"USER": user,
                 "PWD": pwd,
                 "SERVER_NAME": server_name_all,
                 "VERSION": version,
                 "TYPE": type,
                 "COMPONSE_PATH": componse_path}
    return  parameMap

if __name__ == '__main__':

    #获取传入参数列表
    opts, args = getopt.getopt(sys.argv[1:], "hu:p:s:v:t:c:")

    #for test
    #********************************************************************************************************
    #user="msms-ci"
    #pwd="msms-ci*123"
    # server_name="zte-crm-person-pipeline,zte-crm-person-pipelineui"
    # server_name = "zte-crm-person-pipeline"
    #server_name = "zte-crm-person-pipelineui"
    #version="1.0.119"
    #type='download'
    #componse_pah=sys.path[0] + "/demo/docker-compose.yml"
    #opts=[("-u",user),("-p",pwd),("-s",server_name),("-v",version),("-t",type),("-c",componse_pah)]
    #args=[]
    # ********************************************************************************************************

    parameMap=getParamentMap(opts,args)
    
    type=parameMap.get("TYPE")
    server_name=parameMap.get("SERVER_NAME")
    version=parameMap.get("VERSION")
    componse_pah=parameMap.get("COMPONSE_PATH")

    if (type.upper() == "download" and componse_pah == ""):
        print("componse yml file path can not be null!")
        sys.exit(0)
    #read config file
    arryArtifactorys=readConfig(server_name,version)
    artifactory_url = "http://sz.artifactory.zte.com.cn/artifactory/"
    # print type
    # sys.exit(0)
    if str(type).upper()=="DOWNLOAD":
        print "run download_file_from_artifactory"
        download_file_from_artifactory(parameMap,arryArtifactorys,artifactory_url)
    else:
        print "run upload_file_to_artifactory"
        upload_file_to_artifactory(parameMap,arryArtifactorys,artifactory_url)
