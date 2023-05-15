import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
import Action from ".././Action";
import axios from "axios";
// import { useState } from "react";
import DataType from "../../../types";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "../../store/useAppDispatch";
import { fetchList, selectList, updateItem } from "../../store/list";
import useAppSelector from "../../store/useAppSelector";

// let newData: [] = [];
let lastname = "";
const initList = async () => {
  const res = await axios.get("/api/stu/list");
  return res;
};

const App = (props: { name: string }) => {
  const data = useAppSelector(selectList);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { name } = props;
  console.log("name: ", name, name==="")
  //const [data, setData] = useState([]);
  if (name !== "") {
    console.log(333333)
    initList().then((res) => {
      if(res.data.code === -2){
        nav("../");
      }
      else {
        if (data === undefined || res.data.list.length !== data.length) {
          //dispatch(updateItem());
        }
        lastname = "";
      }
    });
  } else {
    console.log(111111,222)
    dispatch(fetchList());
    console.log("data",data)
    // initList().then((res) => {
    //   const tmp:[] = res.data.list;
    //   if (name !== lastname) {
    //     newData = []
    //     for (let i in tmp) {
    //       const item:DataType = tmp[i];
    //       if(item.name === name){
    //         newData.push(tmp[i]);
    //       }
    //     }
    //     setData(newData);
    //     lastname = name;
    //   }
    // });
  }
  const change = () => {
    initList().then((res) => {
      //setData(res.data.list);
    });
  };
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
          <Action id={record.id} change={change} list={data} />
        </Tag>
      ),
    },
  ];
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      pagination={paginationProps}
    />
  );
};

const paginationProps = {
  pageSize: 5, // 每页数据条数
};

export default App;
