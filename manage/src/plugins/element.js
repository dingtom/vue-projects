import Vue from 'vue'

// import { createApp } from 'vue'
// vuecli3 和 4 的区别
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tag,
  Tree,
  Select,
  Option,
  Cascader,
  Alert,
  Tabs,
  TabPane,
  Steps,
  Step,
  CheckboxGroup,
  Checkbox,
  Upload,
  Timeline,
  TimelineItem
} from 'element-ui'

// createApp().use(Button)
// createApp().use(Form)
// createApp().use(FormItem)
// createApp().use(Input)
// createApp().use(Container)
// createApp().use(Header)
// createApp().use(Aside)
// createApp().use(Main)
// createApp().use(Menu)
// createApp().use(Submenu)
// createApp().use(MenuItem)
// createApp().use(Breadcrumb)
// createApp().use(BreadcrumbItem)
// createApp().use(Card)
// createApp().use(Row)
// createApp().use(Col)
// createApp().use(Table)
// createApp().use(TableColumn)
// createApp().use(Switch)
// createApp().use(Tooltip)
// createApp().use(Pagination)
// createApp().use(Dialog)
// createApp().use(Tag)
// createApp().use(Tree)
// createApp().use(Select)
// createApp().use(Option)
// createApp().use(Cascader)
// createApp().use(Alert)
// createApp().use(Tabs)
// createApp().use(TabPane)
// createApp().use(Steps)
// createApp().use(Step)
// createApp().use(CheckboxGroup)
// createApp().use(Checkbox)
// createApp().use(Upload)
// createApp().use(Timeline)
// createApp().use(TimelineItem)
//
// // 弹窗组件挂载到vue原型对象 每个组件都可以通过this访问$message
// createApp().prototype.$message = Message
// createApp().prototype.$confirm = MessageBox.confirm

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Upload)
Vue.use(Timeline)
Vue.use(TimelineItem)

// // 弹窗组件挂载到vue原型对象 每个组件都可以通过this访问$message
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
