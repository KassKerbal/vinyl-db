
function ApiRemove(id: string | undefined) {

    const request = {
        method: 'DELETE'
    }

    const getData = async () => {
        try {
            await fetch('http://localhost:3000/api/v1/posts/' + id, request);
        }
        catch (err) {
            console.log(err);
        }
    }

    getData()
}

export default ApiRemove