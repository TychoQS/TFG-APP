import React from 'react';
import { Layout, Typography, ConfigProvider, theme } from 'antd';
import './App.css';

const { Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Title>TFG-APP Initialized</Title>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
