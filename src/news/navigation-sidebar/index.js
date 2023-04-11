import { MailOutlined, SettingOutlined, HomeOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import getItem from '../../common/util';

const items = 
  [getItem('Home', '/home', <HomeOutlined />), getItem('Activities', '/activities', <CalendarOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Profile', '/profile'),
    getItem('Login', '/login'),
  ]),
  
];
const News = () => {
  const navigate = useNavigate();
  return (

    <Menu
      onClick={
        ({key}) => {
            if (key === "logout") {
                // TODO
            } else {
                navigate(key)
            }
        }
      }
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};
export default News;

