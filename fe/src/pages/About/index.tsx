import { Divider, List, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { selectLogin } from "../../store/login";
import useAppSelector from "../../store/useAppSelector";
import { useEffect } from "react";

const data = [
  "添加以及修改用户时会进行类型检查，名字、专业为中文，电话、邮箱、头像URL要有效",
  "点击添加用户，会出现一个表单，填写表单可以添加一个新用户，用户的名字可以重复",
  "输入姓名进行搜索时，如果查询到多个用户，将其均展示出来",
  "点击重置按钮，清空搜索框，重置搜索到的结果，显示整个用户列表",
  "点击左侧导航栏，切换人员管理和关于页面，默认为人员管理页面",
  "当鼠标悬浮在操作一栏时，会出现下拉菜单，其中有三个操作，查看、编辑和删除操作",
  "点击查看会跳转到用户详情页",
  "点击编辑会出现一个带有内容的表单，可以对其进行编辑，此过程也会进行类型检查",
  "点击删除会出现一个提示框，确定是否删除，点击确定之后才能执行删除操作",
  "当鼠标悬浮在头像上时，会出现退出登录按钮，点击即可退出当前登录状态，并返回到登录页面",
  "如果当前未登录时，是无法进入到除登录页面之外的管理页面的"
];

const App = () => {
  const status = useAppSelector(selectLogin);
  const nav = useNavigate();

  useEffect(() => {
    if(!status) nav('../');
  }, [nav, status])
  return (
    <>
      <Divider orientation="left">关于</Divider>
      <List
        header={<div></div>}
        footer={<div></div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>[tips]</Typography.Text> {item}
          </List.Item>
        )}
      />
    </>
  );
};

export default App;
