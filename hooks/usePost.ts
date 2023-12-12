import {
  memberBodyInterface,
  subjectBodyInterface,
  userBodyInterface,
} from '@/app/components/Form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';

const usePost = () => {
  const router = useRouter();
  const config = {
    headers: {
      Authorization: `Bearer ${getCookie('mathilda')}`,
    },
  };

  const postTeacher = async (
    e: React.FormEvent,
    type: string,
    userBody: userBodyInterface,
    memberBody: memberBodyInterface,
    id?: string,
  ) => {
    e.preventDefault();
    const body = {
      user: userBody,
      teacher: memberBody,
    };

    if (type === 'new') {
      const res = await axios
        .post('https://mathilda-management-6d5c387a84e7.herokuapp.com/teachers', body)
        .then((res) => {
          if (res.status === 201) {
            router.replace('/session/new');
            router.refresh();
          }
        });

      return res;
    } else {
      const res = await axios
        .patch(
          `https://mathilda-management-6d5c387a84e7.herokuapp.com/teachers/${id}`,
          body,
          config,
        )
        .then((res) => {
          if (res.status === 200) {
            router.replace('/me');
            router.refresh();
          }
        });

      return res;
    }
  };

  const postStudent = async (
    e: React.FormEvent,
    type: string,
    userBody: userBodyInterface,
    memberBody: memberBodyInterface,
    id?: string,
  ) => {
    e.preventDefault();
    const body = {
      ...(type === 'new' && { user: userBody }),
      student: memberBody,
    };

    if (type === 'new') {
      const res = await axios
        .post('https://mathilda-management-6d5c387a84e7.herokuapp.com/students', body)
        .then((res) => {
          if (res.status === 201) {
            router.replace('/session/new');
            router.refresh();
          }
        });

      return res;
    } else {
      const res = await axios
        .patch(`https://mathilda-management-6d5c387a84e7.herokuapp.com/students/${id}`, body, config)
        .then((res) => {
          if (res.status === 200) {
            router.replace('/me');
            router.refresh();
          }
        });

      return res;
    }
  };

  const postNewSession = async (e: React.FormEvent, userBody: userBodyInterface) => {
    e.preventDefault();
    const body = {
      user: userBody,
    };

    const res = await axios
      .post('https://mathilda-management-6d5c387a84e7.herokuapp.com/login', body)
      .then((res) => {
        if (res.status === 202) {
          setCookie('mathilda', res.data.token, {
            maxAge: 30 * 24 * 60 * 60,
          });
          router.replace('/me');
          router.refresh();
        }
      });

    return res;
  };

  const postSubject = async (
    e: React.FormEvent,
    type: string,
    subjectBody: subjectBodyInterface,
    id?: string,
  ) => {
    e.preventDefault();
    const body = {
      subject: subjectBody,
    };

    if (type === 'new') {
      const res = await axios
        .post('https://mathilda-management-6d5c387a84e7.herokuapp.com/subjects', body, config)
        .then((res) => {
          if (res.status === 201) {
            router.replace('/subjects');
            router.refresh();
          }
        });
      return res;
    } else {
      const res = await axios
        .patch(
          `https://mathilda-management-6d5c387a84e7.herokuapp.com/subjects/${id}`,
          body,
          config,
        )
        .then((res) => {
          if (res.status === 200) {
            router.replace('/subjects');
            router.refresh();
          }
        });
      return res;
    }
  };

  return { postTeacher, postStudent, postNewSession, postSubject };
};

export default usePost;
