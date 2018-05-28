###说明
树形组件用了第三方组件 [angular-tree-component](https://angular2-tree.readme.io/docs) 此组件功能强大，demo中使用了异步加载子节点，拖动换节点位置，其他更多功能请详见官方文档。
###引入 'TreeModule '
在当前模块的.module.ts中引入'TreeModule'

    import { TreeModule } from 'angular-tree-component';

添加到@NgModule装饰器中

    @NgModule({ 
        imports: [ 
            TreeModule 
        ] 
    });

###引用组件标签
.component.html中，直接引用组件标签，如：

    <tree-root #tree [nodes]="nodes" [options]="options" (moveNode)="onMoveNode($event)"
        <ng-template #treeNodeTemplate let-node="node" let-index="index"
            <i class="jstree-icon jstree-themeicon m--font-success jstree-themeicon-custom ｛｛ node.data.icon ｝｝" role="presentation"></i
            <span (click)="getItemData(node)"{{ node.data.name }} </span
        </ng-template
    </tree-root

###配置组件参数和方法

.component.ts中配置组件参数和方法:

    export class TreeviewDemoComponent implements OnInit { 
        nodes: Array<any= []; 
        // 配置tree选项 
        options: ITreeOptions = { 
            allowDrag: true, // 支持拖动位置 
            getChildren: this.getChildrenList.bind(this), // 异步加载子节点 
            allowDrop: (element, { parent, index }) ={ // 拖动选项 
                return parent.hasChildren; 
            }, 
            getNodeClone: (item: any) =({ // 拖动克隆对象 
                id: item.node.id, 
                name: item.node.name 
            }) 
        }; 
        // 获取子列表 
        getChildrenList(node: any) { 
            let newNodes: Array<any= []; 
            // asyn get childnodes 
            return new Promise((resolve, reject) ={ 
                setTimeout(() =resolve(newNodes), 1500); 
            }); 
        }; 
    };

###官方文档
更多功能详细说明请查看 [官方文档](https://angular2-tree.readme.io/docs)， github位置请 [点击](https://github.com/500tech/angular-tree-component)