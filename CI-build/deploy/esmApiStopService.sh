set +v
set -e

#本shell脚本所在目录。
shellMePath="$( cd "$( dirname "$0"  )" && pwd  )"
export PATH=/usr/local/jdk1.8.0_31/bin:$shellMePath/:$PATH
deployeServiceName=$1
echo appStackName:$appStackName
echo will rmove:$deployeServiceName
appStackId=$(curl -u ${esmAccessKey}:${esmSecretKey} ${esmApiUrl}/stacks?name=${appStackName} | jq -r .data[0].id)
echo appStackId:$appStackId
#http://test.esm.zte.com.cn/v2-beta/projects/1a5/services/?name=zte-itp-configone-demofst&stackId=1st412
appServiceId=$(curl -u ${esmAccessKey}:${esmSecretKey} ${esmApiUrl}/services/?name=${deployeServiceName}"&"stackId=$appStackId | jq -r .data[0].id)
appServiceIdlen=$(echo $appServiceId|wc -L)
if [ $appServiceIdlen -lt 5  ];then
	echo may not exits in esm of servicid:${deployeServiceName}
	exit 0
fi

curl  -u "${esmAccessKey}:${esmSecretKey}" -X POST -H 'Accept: application/json'  -H 'Content-Type: application/json' -d '{}' ${esmApiUrl}/services/$appServiceId/?action=remove
#echo curl  -u ${esmAccessKey}:${esmSecretKey} ${esmApiUrl}/services/$appServiceId
echo ${deployeServiceName} curstated:
curl  -u ${esmAccessKey}:${esmSecretKey} ${esmApiUrl}/services/$appServiceId | jq -r .state




