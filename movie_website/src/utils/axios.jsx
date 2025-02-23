import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTViNzJhYTBmNmJkMDY4NTUwNjMwZDQ5MTJjYmUxNCIsIm5iZiI6MTcyOTE2MTY5Ni4wMDkxOCwic3ViIjoiNjcxMGU1ZmI2Zjc3MDdhZjQwZmE4YzE4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.JyKn3iOR_kyhNgA3_-MGYg4ItYwKCvlTDsVhO-SrpXA'
      }
});

export default instance;