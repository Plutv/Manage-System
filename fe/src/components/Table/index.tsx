import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
import Action from ".././Action";
import DataType from "../../../types";
import useAppDispatch from "../../store/useAppDispatch";
import { fetchList, selectList } from "../../store/list";
import useAppSelector from "../../store/useAppSelector";
import { useEffect } from "react";
import { selectLogin } from "../../store/login";
import { useNavigate } from "react-router-dom";

const App = (props: { name: string }) => {
  console.log('update Table')
  const data: DataType[] = useAppSelector(selectList);
  const status: boolean = useAppSelector(selectLogin);
  const nav = useNavigate()
  const dispatch = useAppDispatch();
  let search: DataType[] = []
  const { name } = props;

  if(name !== ""){
    search = data.filter((item) => 
    item.name === name)
  }
  useEffect(() => {
    if(!status) {
      nav('../');
    }
    console.log('init Table')
    dispatch(fetchList())
  }, [dispatch, nav, status]) // dispatch 在此处有什么用？
  
  const columns: ColumnsType<DataType> = [
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      width: 120,
      render: (_, record) => (
        <img src={record.avatar} alt="avatar" width={70}></img>
      ),
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "专业",
      dataIndex: "major",
      key: "major",
      width: 250,
    },
    {
      title: "年级",
      width: 150,
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "性别",
      key: "gender",
      width: 90,
      dataIndex: "gender",
      render: (_, { gender }) => {
            let color = gender === "男" ? 'blue' : 'pink';
            return <Tag color={color} >{gender}</Tag>
          }
       ,
    },
    {
      title: "电话",
      key: "tel",
      width: 200,
      dataIndex: "tel",
    },
    {
      title: "邮箱",
      width: 240,
      dataIndex: "mail",
      key: "mail",
    },
    {
      title: "操作",
      width: 100,
      key: "action",
      render: (_, record) => (
        <Tag id="setting">
          <Action key={record.id} id={record.id} />
        </Tag>
      ),
    },
  ];
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={name === "" ? data : search}
      pagination={paginationProps}
    />
  );
};

const paginationProps = {
  pageSize: 5, // 每页数据条数
};

export default App;
