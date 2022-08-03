import {DataForm} from './types';
interface CreateVynilProps {
    vinyl: DataForm | undefined;
    id?: string;
  }

function ApiUpload({ vinyl, id }: CreateVynilProps) {

    const jsonVynil: string = JSON.stringify(vinyl);
    const request: RequestInit = {
      headers: {'Content-Type': 'application/json'},
      method: id? 'PUT' : 'POST',
      body: jsonVynil,
    }

    const postData = async () => {
        try {
            const response = id ? await fetch('http://localhost:3000/api/v1/posts/' + id, request) : await fetch('http://localhost:3000/api/v1/posts/', request)
        }
        catch (err) {
            console.log(err);
        }
    }
    postData();
}

export default ApiUpload