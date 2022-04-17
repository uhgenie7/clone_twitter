import React, { useState, useCallback, useMemo } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";

// 리랜더링 되어도 같은 객체가 유지된다!
const style = useMemo(() => ({ marginTop: 10 }), []);

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const onChangeId = useCallback(() => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback(() => {
    setPassword(e.target.value);
  }, []);

  return (
    <Form>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div style={style}>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
