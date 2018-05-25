
//构造节点树形结构
export function treeList(newTreeData, className) {
    function treeMenu(a) {
        this.tree = a || [];
        this.groups = {};
    };

    treeMenu.prototype = {
        init: function (pid) {
            this.group();
            return this.getDom(this.groups[pid]);
        },
        group: function () {
            for (var i = 0; i < this.tree.length; i++) {
                if (this.groups[this.tree[i].pId]) {
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                } else {
                    this.groups[this.tree[i].pId] = [];
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                }
            }
        },
        getDom: function (a) {
            if (!a) { return '' }
            var html = '\n<ul >\n';
            for (var i = 0; i < a.length; i++) {
                html += '<li class="' + className + '" style=\"padding:5px 0 5px 15px\"><img src="/src/images/jiantou_right.png" style=\"width:10px;height:10px\"/><a slot_type="' + a[i].slot_type + '" slot_id="' + a[i].slot_id + '">' + a[i].name + '</a>';
                html += this.getDom(this.groups[a[i].id]);
                html += '</li>\n';
            };
            html += '</ul>\n';
            return html;
        }
    };
    var html = new treeMenu(newTreeData).init(0);  //初始父ID为0
    return html;
}

//构造设备组树形结构
export function grouptreeList(newTreeData, className) {
    function treeMenu(a) {
        this.tree = a || [];
        this.groups = {};
    };

    treeMenu.prototype = {
        init: function (pid) {
            this.group();
            return this.getDom(this.groups[pid]);
        },
        group: function () {
            for (var i = 0; i < this.tree.length; i++) {
                if (this.groups[this.tree[i].pId]) {
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                } else {
                    this.groups[this.tree[i].pId] = [];
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                }
            }
        },
        getDom: function (a) {
            if (!a) { return '' }
            var html = '\n<ul >\n';
            for (var i = 0; i < a.length; i++) {
                html += '<li class="' + className + '" style=\"padding:5px 0 5px 15px\"><img src="/src/images/jiantou_right.png" style=\"width:10px;height:10px\"/><a dev_group_id="' + a[i].dev_group_id + '">' + a[i].group_name + '</a>';
                html += this.getDom(this.groups[a[i].id]);
                html += '</li>\n';
            };
            html += '</ul>\n';
            return html;
        }
    };
    var html = new treeMenu(newTreeData).init(0);  //初始父ID为0
    return html;
}

//构造组织机构树形结构
export function organizationTreeList(newTreeData, className) {
    function treeMenu(a) {
        this.tree = a || [];
        this.groups = {};
    };

    treeMenu.prototype = {
        init: function (pid) {
            this.group();
            return this.getDom(this.groups[pid]);
        },
        group: function () {
            for (var i = 0; i < this.tree.length; i++) {
                if (this.groups[this.tree[i].pId]) {
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                } else {
                    this.groups[this.tree[i].pId] = [];
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                }
            }
        },
        getDom: function (a) {
            if (!a) { return '' }
            var html = '\n<ul >\n';
            for (var i = 0; i < a.length; i++) {
                html += '<li class="' + className + '" style=\"padding:5px 0 5px 15px\"><img src="/src/images/jiantou_right.png" style=\"width:10px;height:10px\"/><a _id="' + a[i].id + '">' + a[i].name + '</a>';
                html += this.getDom(this.groups[a[i].id]);
                html += '</li>\n';
            };
            html += '</ul>\n';
            return html;
        }
    };
    var html = new treeMenu(newTreeData).init(0);  //初始父ID为0
    return html;
}

//构造权限模块树形结构
export function permissionTreeList(newTreeData, className) {
    function treeMenu(a) {
        this.tree = a || [];
        this.groups = {};
    };

    treeMenu.prototype = {
        init: function (pid) {
            this.group();
            return this.getDom(this.groups[pid]);
        },
        group: function () {
            for (var i = 0; i < this.tree.length; i++) {
                if (this.groups[this.tree[i].pId]) {
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                } else {
                    this.groups[this.tree[i].pId] = [];
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                }
            }
        },
        getDom: function (a) {
            if (!a) { return '' }
            var html = '\n<ul >\n';
            for (var i = 0; i < a.length; i++) {
                if (a[i].type == 1) {
                    html += '<li class="' + className + '" style=\"padding:5px 0 5px 15px\"><img src="/src/images/jiantou_right.png" style=\"width:10px;height:10px\"/><a _id="' + a[i].id + '">' + a[i].name + '</a>';
                    html += this.getDom(this.groups[a[i].id]);
                    html += '</li>\n';
                } else {
                    html += '<li class="' + className + '" style=\"padding:5px 0 5px 15px\"><a _id="' + a[i].id + '">' + a[i].name + '</a>';
                    if (a[i].permission != null) {
                        var permissionJson = JSON.parse(a[i].permission);
                        for (var j = 0; j < permissionJson.length; j++) {
                            html += '<input type="checkbox" name="checkbox" value="' + permissionJson[j].id + '" style=\" margin-left:10px\">' + permissionJson[j].permission + '';
                        }
                    }

                    html += this.getDom(this.groups[a[i].id]);
                    html += '</li>\n';
                }

            };
            html += '</ul>\n';
            return html;
        }
    };
    var html = new treeMenu(newTreeData).init(0);  //初始父ID为0
    return html;
}

//构造资产类型树形结构
export function archivesTreeList(newTreeData, className) {
    function treeMenu(a) {
        this.tree = a || [];
        this.groups = {};
    };

    treeMenu.prototype = {
        init: function (pid) {
            this.group();
            return this.getDom(this.groups[pid]);
        },
        group: function () {
            for (var i = 0; i < this.tree.length; i++) {
                if (this.groups[this.tree[i].pId]) {
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                } else {
                    this.groups[this.tree[i].pId] = [];
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                }
            }
        },
        getDom: function (a) {
            if (!a) { return '' }
            var html = '\n<ul >\n';
            for (var i = 0; i < a.length; i++) {
                html += '<li class="' + className + '" style=\"padding:5px 0 5px 15px\"><img src="/src/images/jiantou_right.png" style=\"width:10px;height:10px\"/><a _id="' + a[i].id + '" type_no="' + a[i].asset_type_no + '">' + a[i].name + '</a>';
                html += this.getDom(this.groups[a[i].id]);
                html += '</li>\n';
            };
            html += '</ul>\n';
            return html;
        }
    };
    var html = new treeMenu(newTreeData).init(-1);  //初始父ID为0
    return html;
}


//构造仓库管理平面树形结构
export function inventoryTreeList(newTreeData, className) {
    function treeMenu(a) {
        this.tree = a || [];
        this.groups = {};
    };

    treeMenu.prototype = {
        init: function (pid) {
            this.group();
            return this.getDom(this.groups[pid]);
        },
        group: function () {
            for (var i = 0; i < this.tree.length; i++) {
                if (this.groups[this.tree[i].pId]) {
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                } else {
                    this.groups[this.tree[i].pId] = [];
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                }
            }
        },
        getDom: function (a) {
            if (!a) { return '' }
            var html = '\n<ul >\n';
            for (var i = 0; i < a.length; i++) {
                let returnHtml = "";
                if (a[i].room_id == null) {
                    returnHtml = '<li class="' + className + '" style=\"padding:5px 0 5px 15px\"><img src="/src/images/jiantou_right.png" style=\"width:10px;height:10px\"/><a slot_id="' + a[i].id + '" room_id="' + a[i].room_id + '">' + a[i].name + '</a>';
                } else {
                    returnHtml = '<li class="' + className + '" style=\"padding:5px 0 5px 15px\"><img src="/src/images/jiantou_right.png" style=\"width:10px;height:10px\"/><img src="/src/images/position/inventory.png" style=\"width:8px;height:10px\"/><a slot_id="' + a[i].id + '" room_id="' + a[i].room_id + '">' + a[i].name + '</a>';
                }
                html += returnHtml;
                html += this.getDom(this.groups[a[i].id]);
                html += '</li>\n';
            };
            html += '</ul>\n';
            return html;
        }
    };
    var html = new treeMenu(newTreeData).init(0);  //初始父ID为0
    return html;
}

//构造库位管理平面树形结构
export function posManagerTreeList(newTreeData, className) {
    function treeMenu(a) {
        this.tree = a || [];
        this.groups = {};
    };

    treeMenu.prototype = {
        init: function (pid) {
            this.group();
            return this.getDom(this.groups[pid]);
        },
        group: function () {
            for (var i = 0; i < this.tree.length; i++) {
                if (this.groups[this.tree[i].pId]) {
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                } else {
                    this.groups[this.tree[i].pId] = [];
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                }
            }
        },
        getDom: function (a) {
            if (!a) { return '' }
            var html = '\n<ul >\n';
            for (var i = 0; i < a.length; i++) {
                let returnHtml = "";
                if (a[i].room_id == null) {
                    returnHtml = '<li class="' + className + '" style=\"padding:5px 0 5px 15px\"><img src="/src/images/jiantou_right.png" style=\"width:10px;height:10px\"/><a slot_id="' + a[i].id + '" room_id="' + a[i].room_id + '">' + a[i].name + '</a>';
                } else {
                    returnHtml = '<li class="' + className + '" style=\"padding:5px 0 5px 15px\"><img src="/src/images/jiantou_right.png" style=\"width:10px;height:10px\"/><img src="/src/images/position/inventory.png" style=\"width:8px;height:10px\"/><a slot_id="' + a[i].id + '" room_id="' + a[i].room_id + '">' + a[i].name + '</a>';
                }
                html += returnHtml;
                html += this.getDom(this.groups[a[i].id]);
                html += '</li>\n';
            };
            html += '</ul>\n';
            return html;
        }
    };
    var html = new treeMenu(newTreeData).init(0);  //初始父ID为0
    return html;
}

//补货管理平面树形结构
export function addGoodsTreeList(newTreeData, className) {
    function treeMenu(a) {
        this.tree = a || [];
        this.groups = {};
    };

    treeMenu.prototype = {
        init: function (pid) {
            this.group();
            return this.getDom(this.groups[pid]);
        },
        group: function () {
            for (var i = 0; i < this.tree.length; i++) {
                if (this.groups[this.tree[i].pId]) {
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                } else {
                    this.groups[this.tree[i].pId] = [];
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                }
            }
        },
        getDom: function (a) {
            if (!a) { return '' }
            var html = '\n<ul >\n';
            for (var i = 0; i < a.length; i++) {
                let returnHtml = "";
                if (a[i].room_id == null) {  //没有关联仓库
                    if (a[i].slot_type == 3) {  //货区
                        if (a[i].dev_id == null) { //没有关联设备
                            returnHtml = '<li class="' + className + '" style=\"padding:5px 0 5px 15px\"><a style=\"margin-left:10px\" dev_name="' + a[i].dev_name + '" dev_id="' + a[i].dev_id + '" slot_type="' + a[i].slot_type + '" slot_id="' + a[i].id + '" room_id="' + a[i].room_id + '">' + a[i].name + '</a>';
                        } else {
                            returnHtml = '<li class="' + className + '" style=\"padding:5px 0 5px 15px\"><img src="/src/images/position/dev.png" style=\"width:12px;height:10px\"/><a style=\"margin-left:2px\" dev_name="' + a[i].dev_name + '" dev_id="' + a[i].dev_id + '" slot_type="' + a[i].slot_type + '" slot_id="' + a[i].id + '" room_id="' + a[i].room_id + '">' + a[i].name + '</a>';
                        }

                    } else {
                        returnHtml = '<li class="' + className + '" style=\"padding:5px 0 5px 15px\"><img src="/src/images/jiantou_right.png" style=\"width:10px;height:10px\"/><a slot_type="' + a[i].slot_type + '" slot_id="' + a[i].id + '" room_id="' + a[i].room_id + '">' + a[i].name + '</a>';
                    }
                } else {
                    returnHtml = '<li class="' + className + '" style=\"padding:5px 0 5px 15px\"><img src="/src/images/jiantou_right.png" style=\"width:10px;height:10px\"/><img src="/src/images/position/inventory.png" style=\"width:10px;height:12px\"/><a margin-left:2px\" slot_type="' + a[i].slot_type + '" slot_id="' + a[i].id + '" room_id="' + a[i].room_id + '">' + a[i].name + '</a>';
                }
                html += returnHtml;
                html += this.getDom(this.groups[a[i].id]);
                html += '</li>\n';
            };
            html += '</ul>\n';
            return html;
        }
    };
    var html = new treeMenu(newTreeData).init(0);  //初始父ID为0
    return html;
}

//构造物料类型树形结构
export function goodsTreeList(newTreeData, className) {
    function treeMenu(a) {
        this.tree = a || [];
        this.groups = {};
    };

    treeMenu.prototype = {
        init: function (pid) {
            this.group();
            return this.getDom(this.groups[pid]);
        },
        group: function () {
            for (var i = 0; i < this.tree.length; i++) {
                if (this.groups[this.tree[i].pId]) {
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                } else {
                    this.groups[this.tree[i].pId] = [];
                    this.groups[this.tree[i].pId].push(this.tree[i]);
                }
            }
        },
        getDom: function (a) {
            if (!a) { return '' }
            var html = '\n<ul >\n';
            for (var i = 0; i < a.length; i++) {
                html += '<li class="' + className + '" style=\"padding:5px 0 5px 15px\"><img src="/src/images/jiantou_right.png" style=\"width:10px;height:10px\"/><a _id="' + a[i].id + '" type_no="' + a[i].asset_type_no + '">' + a[i].name + '</a>';
                html += this.getDom(this.groups[a[i].id]);
                html += '</li>\n';
            };
            html += '</ul>\n';
            return html;
        }
    };
    var html = new treeMenu(newTreeData).init(-1);  //初始父ID为0
    return html;
}