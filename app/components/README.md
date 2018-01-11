###展示组件（木偶组件）
<p>1、props一定时，结果确定。2、是可多次复用的组件 (2条必备条件)</p>
<ul>
    <li>生成方式：
        <ul>
            <li>首选无状态组件；</li>
            <li>次选 面向对象式ES6组件</li>
        </ul>
    </li>
    <li>数据传输方式：
        <ul>
            <li>仅通过props传入</li>
            <li>组件内，不能使用 本地储存、ajax等数据请求、redux connect。</li>
        </ul>
    </li>
</ul>
<p>目录结构：</p>
<ul>
    <li>
        一级目录：通用组件common
        <ul>
            <li>二级目录：各通用组件(多页面使用)</li>
        </ul>
    </li>
    <li>
        一级目录：页面组件pages
        <ul>
            <li>二级目录：对应pages文件内组件(页面组件，可升级为通用组件)</li>
        </ul>
    </li>
</ul>