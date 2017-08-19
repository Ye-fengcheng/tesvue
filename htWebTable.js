initBusinessModelTable(bo){
            let thiz = this;
            tablePane = new ht.ui.TablePane();
            let table = tablePane.getTableView();
            let tableHeader = tablePane.getTableHeader();
            let dataModel = table.getDataModel();
            let columnModel = table.getColumnModel();
            
            tableHeader.setPreferredSize(0,42);//设置表头的高，第一个宽无效
            tableHeader.setBackground('#20a0ff')
            let belongTos = [
                'Eric',
                'Yancy',
                'David'
            ];
            let datas = bo;
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
            tablePane.getTableView().setCheckMode(true); //设置有全选模式

            let column = null;
            column = new ht.ui.Column();
            column.setName('num');
            column.setDisplayName('业务模型编号');
            column.setAccessType('attr');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('name');
            column.setDisplayName('版本号');
            column.setEditable(true);
            column.setEditorClass('ht.ui.editor.StringEditor');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('duration');
            column.setAccessType('attr');
            column.setDisplayName('提交人');
            column.formatValue = function (value) {
                return value + ' Days';
            };
            column.setEditable(true);
            column.setEditorClass('ht.ui.editor.IntEditor');
            columnModel.add(column);

            column = new ht.ui.Column();
            column.setName('progress');
            column.setAccessType('attr');
            column.setDisplayName('提交时间');
            column.drawCell = function (g, data, selected, column, x, y, w, h, view) {
                let value = data.a('progress'),
                    rectY = y + (h - 30) / 2;

                g.beginPath();
                g.fillStyle = 'white';
                g.fillRect(x, rectY, w, 30);
                g.beginPath();
                g.fillStyle = '#139dd7';
                g.fillRect(x, rectY, w * (value / 100), 30);

                ht.Default.drawText(g, value + '%', '12px Arial', 'black', x, y, w, h, 'center', 'middle');
            }
            column.setEditable(true);
            column.setEditorClass('ht.ui.editor.NumberEditor');
            columnModel.add(column);

            

            column = new ht.ui.Column();
            column.setName('color');
            column.setDisplayName('审批人');
            column.setAccessType('attr');
            column.setValueType('color');
            column.setEditable(true);
            column.setEditorClass('ht.ui.editor.ColorEditor');
            columnModel.add(column);

            column = new ht.ui.EnumColumn();
            column.setDatas(belongTos);
            column.setName('belongTo');
            column.setDisplayName('审批时间');
            column.setAccessType('attr');
            column.setEditable(true);
            columnModel.add(column);

            column = new ht.ui.EnumColumn();
            column.setName('popularity');
            column.setDisplayName('审批意见');
            column.setAccessType('attr');
            columnModel.add(column);
            column.drawCell = function (g, data, selected, column, x, y, width, height) {
                let chartDiv = data.chartDiv;
                if (!chartDiv) {
                    // 绘制 chart
                    chartDiv = data.chartDiv = document.createElement('div');
                    chartDiv.style.position = 'absolute';
                    chartDiv.style.top = (height - 20) / 2 + 'px';
                    chartDiv.style.width = width + 'px';
                    chartDiv.style.height = '20px';
                }
                if (data._timeId != null) {
                    clearTimeout(data._timeId);
                    delete data._timeId;
                }
                return chartDiv;
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
                    g.fillStyle = '#FFFFFF';
                }
                g.beginPath();
                g.rect(x, y, width, height);
                g.fill();
            };
            table.getSelectionModel().addSelectionChangeListener(function(e){
                debugger
                thiz.modelCopy = table.getSelectionModel().isEmpty();
                thiz.modelDelete = table.getSelectionModel().isEmpty();
                //e.preventdefault();
            });
            table.onDataClicked = function(data, e){
                debugger
                thiz.isShow = true;
                thiz.$refs.businessModelConfigList.$refs.popper.style.display = 'block';
                thiz.$refs.businessModelConfigList.$refs.popper.style.position = 'fixed';
                thiz.$refs.businessModelConfigList.$refs.popper.style.bottom = '0px';
                thiz.$refs.businessModelConfigList.$refs.popper.style.width = thiz.$refs.tabs.$el.clientWidth+"px";
                thiz.popoverTitle = data.getName();
            };
            tablePane.addToDOM(this.$refs.recordsTable,{width: this.$refs.tabs.$el.clientWidth,height:570});
            setTimeout(function(){
                tablePane.setWidth(thiz.$refs.tabs.$el.clientWidth)
            });
        },