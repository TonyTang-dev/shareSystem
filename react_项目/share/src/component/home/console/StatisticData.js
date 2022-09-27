import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';

const StatisticData = () => (
    <div className="site-statistic-demo-card">
        <Row gutter={16}>
            <Col span={12}>
                <Card>
                    <Statistic
                        title="上升"
                        value={11.28}
                        precision={2}
                        valueStyle={{
                            color: '#3f8600',
                        }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%" />
                </Card>
            </Col>
            <Col span={12}>
                <Card>
                    <Statistic
                        title="下降"
                        value={9.3}
                        precision={2}
                        valueStyle={{
                            color: '#cf1322',
                        }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%" />
                </Card>
            </Col>
        </Row>
    </div>
);

export default StatisticData;