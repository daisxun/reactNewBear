
//权限控制
export function PerMissionControl() {
    setTimeout(() => {
        let permissionList = [];
        let permissionData = getPermission();
        if (permissionData.result.code == "0" && permissionData.data.length > 0) {
            permissionList = permissionData.data;
        }

        let btns = document.getElementsByTagName("button");

        for (let i = 0; i < btns.length; i++) {  //先把所有的button进行禁用
            btns[i].disabled = true;
            btns[i].style.color = "#b9b9b9";
        }

        if (permissionList.length > 0) {   //然后查询到有权限的进行启用    
            for (let i = 0; i < btns.length; i++) {
                for (let j = 0; j < permissionList.length; j++) {
                    if (btns[i].name == permissionList[j].permission_id.toString()||btns[i].name =="defult") {
                        btns[i].disabled = false;
                        btns[i].style.color = "#108ee9";
                    }
                }

            }
        }
    }, 100);

}


//获取权限进行控制
var ajaxUrl = 'http://120.79.128.100/device-manager/80';
var token = sessionStorage.getItem("token");

function getPermission() {
    var param = {
        "header": {
            "token": token
        },
        "data": {
            "payload_type": "api",
            "description": {
                "type": "auth",
                "id": "company_admin_get_user_permission",
                "params": {
                }
            }
        }
    }
        ;
    let result;
    $.ajax({
        url: ajaxUrl,
        type: "POST",
        async: false,
        cache: false,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (data) {
            result = data;
        },
        error: function (err) {
            result = 0;
        }
    });

    return result;
}

//权限ID对应权限
// "1"	"平台管理员权限"	"管理公司帐套"
// "2"	"公司账户管理员权限"	"管理公司账户信息跟组织机构"
// "3"	"新增公司帐套"	"创建公司帐套"
// "4"	"修改公司帐套"	"修改帐套"	
// "5"	"查询公司帐套"	"查询账套"	
// "6"	"公司账套密码重置"	"公司账套密码重置"
// "7"	"公司账套注销确认"	"公司账套注销确认"
// "21"	"查看"	"查看创建公司帐套"	
// "22"	"修改"	"修改创建公司帐套"	
// "23"	"请求注销"	"注销创建公司帐套"
// "30"	"查询"	"查看组织机构"	
// "31"	"新增"	"新增组织机构"
// "32"	"修改"	"修改组织机构"	
// "40"	"查询"	"查看角色"	
// "41"	"新增"	"新增角色"	
// "42"	"修改"	"修改角色"	
// "43"	"配置权限"	"角色权限"	
// "44"	"删除"	"删除角色"	
// "50"	"查询"	"查看职位"	
// "51"	"新增"	"新增职位"	
// "52"	"修改"	"修改职位"	
// "53"	"删除"	"删除职位"	
// "60"	"查询"	"查看用户"	
// "61"	"新增"	"新增用户"	
// "62"	"修改"	"修改用户"	
// "63"	"删除"	"删除用户"	
// "80"	"查询"	"查看我的信息"	
// "81"	"关联设备"	"关联rfid设备"	
// "82"	"取消关联"	"取消跟rfid设备的关联"	
// "90"	"查询"	"查看模板"	
// "91"	"新增"	"新建模板"	
// "92"	"删除"	"删除模板"	
// "93"	"添加字段"	"添加模板字段"	
// "94"	"删除字段"	"删除模板字段"	
// "110"	"查看"	"查看数据"	
// "120"	"查看"	"查看数据"	
// "121"	"启用"	"使用此条规则"	
// "122"	"删除"	"没启用的规则才能删除"	
// "150"	"查询"	"查看资产数据"	
// "151"	"新增资产"	"创建资产"	
// "152"	"资产轨迹"	"查看资产进过的路径"	
// "153"	"资产作废"	"设置资产不可用"	
// "154"	"标签作废"	"设置标签为损坏"	
// "155"	"标签作废"	"设置标签为损坏"	
// "156"	"写码"	"写数据到标签epc中"	
// "190"	"查询"	"查看规则设置"	
// "191"	"新建"	"创建规则"	
// "192"	"修改"	"修改规则"	
// "193"	"删除"	"删除规则"	
// "210"	"查看"	"浏览数据"	
// "211"	"添加平面"	""	
// "212"	"添加设备"	""	
// "213"	"添加背景"	""	
// "214"	"修改平面"	""	
// "215"	"修改设备"	""	
// "216"	"删除平面"	""	
// "217"	"删除设备"	""	
// "218"	"删除背景"	""	
// "230"	"添加设备"	""	
// "231"	"删除设备"	""	
// "232"	"分组"	""	
// "233"	"查询"	""	
// "234"	"查询"	""	
// "235"	"添加设备"	""	
// "236"	"添加天线"	""	
// "237"	"删除"	""	


