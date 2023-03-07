import React from "react";
import { Form, Input, Row, Col, Button, TimePicker } from "antd";
import dayjs from "dayjs";


function DoctorForm({ onFinish, initialValues }) {

  // use same form for applying doctor and updating doctor
  return (
    //initial values have the timing component that is not compatible with antd. So we are converting into supporting format with dayjs
    <Form layout="vertical" onFinish={onFinish} initialValues={{
      ...initialValues,
      ...(initialValues && {
        timings : [
          dayjs(initialValues?.timings[0], "HH:mm"),
          dayjs(initialValues?.timings[1], "HH:mm"),
        ]
      })
    }}>
      <h1 className="card-title mt-3">Personal Details</h1>
      <Row gutter={19}>
        <Col span={8} lg={8} sm={24} xs={24}>
          <Form.Item
            required
            label="First Name"
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={8} lg={8} sm={24} xs={24}>
          <Form.Item
            required
            label="Last Name"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col span={8} lg={8} sm={24} xs={24}>
          <Form.Item
            required
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={8} lg={8} sm={24} xs={24}>
          <Form.Item
            required
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
        <Col span={8} lg={8} sm={24} xs={24}>
          <Form.Item
            required
            label="Website"
            name="website"
            rules={[{ required: true }]}
          >
            <Input placeholder="Website" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="card-title mt-3">Professional Details</h1>
      <Row gutter={19}>
        <Col span={8} lg={8} sm={24} xs={24}>
          <Form.Item
            required
            label="Specialization"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input placeholder="Specialization" />
          </Form.Item>
        </Col>
        <Col span={8} lg={8} sm={24} xs={24}>
          <Form.Item
            required
            label="Experience in years"
            name="experience"
            rules={[{ required: true }]}
          >
            <Input placeholder="Experience" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} lg={8} sm={24} xs={24}>
          <Form.Item
            required
            label="Fee per visit"
            name="feePerVisit"
            rules={[{ required: true }]}
          >
            <Input placeholder="Fee per visit" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} lg={8} sm={24} xs={24}>
          <Form.Item
            required
            label="Timings"
            name="timings"
            rules={[{ required: true }]}
          >
          
          <TimePicker.RangePicker format = 'HH:mm'
          />
          </Form.Item>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}

export default DoctorForm;
