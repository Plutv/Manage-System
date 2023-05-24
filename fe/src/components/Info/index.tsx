import { Descriptions } from "antd";
import { fetchList, selectList } from "../../store/list";
import useAppSelector from "../../store/useAppSelector";
import { useParams } from "react-router-dom";
import DataType from "../../../types";
import "./index.css";
import useAppDispatch from "../../store/useAppDispatch";
import { useEffect } from "react";

type Params = {
  id: string;
};
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('init Table')
    dispatch(fetchList())
  }, [dispatch])
  const data = useAppSelector(selectList);
  const params = useParams<Params>();
  const item: DataType | undefined = data.find((obj) => obj.id === params.id?.slice(1));
  return (
    <Descriptions title="User Info" column={1} className={"userinfo-detail"}>
      <Descriptions.Item label="头像">
        <img src={item?.avatar} style={{width:"150px",height:"150px"}} alt="avatar"></img>
      </Descriptions.Item>
      <Descriptions.Item label="姓名">{item?.name}</Descriptions.Item>
      <Descriptions.Item label="专业">{item?.major}</Descriptions.Item>
      <Descriptions.Item label="年级">{item?.grade}</Descriptions.Item>
      <Descriptions.Item label="性别">{item?.gender}</Descriptions.Item>
      <Descriptions.Item label="电话">{item?.tel}</Descriptions.Item>
      <Descriptions.Item label="邮箱">{item?.mail}</Descriptions.Item>
    </Descriptions>
  );
};

export default App;
