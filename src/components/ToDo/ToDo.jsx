import { Badge, Button, Form, Input, Space, Table, Modal } from 'antd';
import { useState ,useEffect} from 'react';
import { useTodoStore } from "../../zustand/todo-store";

export function ToDo () {
    const { todos, createTask, deleteTask ,updateTask} = useTodoStore();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null); 
    const [tempTitle, setTempTitle] = useState(""); 

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Status',
            dataIndex: 'isCompleted',
            key: 'isCompleted',
            render: (_, record) => (
                <Space>
                    <p>{record.isCompleted ? 'success' : 'danger'}</p>
                    <Badge status={record.isCompleted ? 'success' : 'error'} />
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() =>{ setIsModalOpen(true)
                        setEditingTodo(record);
                        setTempTitle(record.title);
                    }
                        
                    }>Edit</Button>
                    <Button 
                      type="primary" danger onClick={() => deleteTask(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const onCreate = (values) => {
        createTask(values.title);
    };
    const handleUpdate = () => {
        if (editingTodo) {
            updateTask(editingTodo.id, tempTitle);
            setIsModalOpen(false);
            setEditingTodo(null);
        }
    };

    return (
        <div style={{ padding: '20px 100px' }}>
            <Form 
                style={{ maxWidth: 600 }} 
                onFinish={onCreate}
            >
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <Input placeholder="Enter..." />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form>

            <Table 
                columns={columns} 
                dataSource={todos} 
                rowKey="id" 
                style={{ marginTop: '20px' }}
                pagination={false}
            />

            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleUpdate}
                onCancel={() => setIsModalOpen(false)}
                closable={{ 'aria-label': 'Custom Close Button' }}
                
            >
            <Input 
                    value={tempTitle} 
                    onChange={(e) => setTempTitle(e.target.value)} 
                    onPressEnter={handleUpdate}
            />
            </Modal>
        </div>
    );
}

export default ToDo