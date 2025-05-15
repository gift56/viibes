<div align="center">
 <h3 align="center">Viibes: Expore the fun in video sharing and Have a happy life</h3>
 
  <div>
    <img src="https://img.shields.io/badge/-Next.JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=black" alt="next.js" />
    <img src="https://img.shields.io/badge/-Sanity.io-black?style=for-the-badge&logo=sanity&logoColor=white&color=F03E2F" alt="sanity.io" />
<img src="https://img.shields.io/badge/-Zustand-black?style=for-the-badge&logoColor=white&logo=zustand&color=8B5CF6" alt="zustand" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets (Code to Copy)](#snippets)
6. 🔗 [Assets](#links)
7. 🚀 [More](#more)

## <a name="introduction">🤖 Introduction</a>

Built with Next.js for the user interface and backend logic, Google Oauth for authentication, and Sanity.io for data storage, styled with TailwindCSS, Viibes is a website project designed to help you expore the fun in video sharing with your apps. The platform offers a sleek and modern experience for spreading the joy in entertainment.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- Sanity
- Tailwind CSS
- Google Oauth
- Zustands

## <a name="features">🔋 Features</a>

👉 **Authentication**: Sign Up and Sign In using google authentication handled by Google Oauth.

👉 **Post Videos**: Easily post video from your local machine with stores uploaded video on the sanity backend.

👉 **Modern UI/UX**: A sleek and user-friendly interface designed for a great experience.

👉 **User's Page**: View uploaded videos and also get see video liked by other user

👉 **Homepage**: Manage and track all your videos uploaded.

👉 **Responsiveness**: Fully responsive design that works seamlessly across devices.

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/gift56/viibes.git
cd viibes
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_GOGGLE_API_TOKEN=
NEXT_PUBLIC_SANITY_TOKEN=
```

Replace the placeholder values with your actual **[Google Cloud Console](https://cloud.google.console/)**, **[Sanity.io](https://sanity.io)** credentials.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>globals.css</code></summary>

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

a {
  color: inherit;
  text-decoration: none;
}

@layer base {
  body {
    @apply dark:bg-black dark:text-gray-100 bg-white text-black  transition-colors;
  }
}

.videos::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(237, 237, 237);
  border-radius: 40px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

img {
  -webkit-user-drag: none;
  user-select: none;
}

select {
  @apply bg-[url('/selectIcon.svg')] cursor-pointer appearance-none bg-no-repeat bg-[center_right_1rem] dark:bg-[url('/whiteSelect.svg')];
}
```

</details>

<details>
<summary><code>utils/index.ts</code></summary>

```javascript
import axios from "axios";
import jwtDecode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetGoogleUser = async (response: any, addUser: any) => {
  const decoded: { name: string, picture: string, sub: string } = jwtDecode(
    response.credential
  );

  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};
```

</details>

<details>
<summary><code>Connecting Sanity Client (utils/client.ts):</code></summary>

```javascript
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "t0pze2mn",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
```

</details>

<details>
<summary><code>Generating Queries to interact with sanity backend (utils/queries.ts):</code></summary>

```javascript
export const allPostsQuery = () => {
  const query = `*[_type == "post"] | order(_createdAt desc){
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
        postedBy->{
          _id,
          userName,
          image
        },
      likes,
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
      }
    }`;

  return query;
};

export const postDetailQuery = (postId: string | string[]) => {
  const query = `*[_type == "post" && _id == '${postId}']{
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image
      },
       likes,
      comments[]{
        comment,
        _key,
        postedBy->{
          _ref,
        _id,
      },
      }
    }`;
  return query;
};

export const searchPostsQuery = (searchTerm: string | string[]) => {
  const query = `*[_type == "post" && caption match '${searchTerm}*' || topic match '${searchTerm}*'] {
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image
      },
  likes,
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
      }
    }`;
  return query;
};

export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const allUsersQuery = () => {
  const query = `*[_type == "user"]`;

  return query;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image
      },
   likes,
  
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
      }
    }`;

  return query;
};

export const userLikedPostsQuery = (userId: string | string[]) => {
  const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image
      },
   likes,
  
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
      }
    }`;

  return query;
};

export const topicPostsQuery = (topic: string | string[]) => {
  const query = `*[_type == "post" && topic match '${topic}*'] {
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image
      },
   likes,
  
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
      }
    }`;

  return query;
};
```

</details>

<details>
<summary><code>Constants:</code></summary>

```javascript
import { BsCodeSlash, BsEmojiSunglasses } from "react-icons/bs";
import { IoGameController, IoFastFoodOutline } from "react-icons/io5";
import { GiGalaxy, GiTravelDress } from "react-icons/gi";
import { FaPaw, FaMedal } from "react-icons/fa";

export const topics = [
  {
    name: "coding",
    icon: <BsCodeSlash />,
  },
  {
    name: "comedy",
    icon: <BsEmojiSunglasses />,
  },
  {
    name: "gaming",
    icon: <IoGameController />,
  },
  {
    name: "food",
    icon: <IoFastFoodOutline />,
  },
  {
    name: "dance",
    icon: <GiGalaxy />,
  },
  {
    name: "fashion",
    icon: <GiTravelDress />,
  },
  {
    name: "animals",
    icon: <FaPaw />,
  },
  {
    name: "sports",
    icon: <FaMedal />,
  },
];

export const footerList1 = [
  "About",
  "Newsroom",
  "Store",
  "Contact",
  "Carrers",
  "ByteDance",
  "Creator Directory",
];
export const footerList2 = [
  "Viibes for Good",
  "Advertise",
  "Developers",
  "Transparency",
  "Viibes Rewards",
];
export const footerList3 = [
  "Help",
  "Safety",
  "Terms",
  "Privacy",
  "Creator Portal",
  "Community Guidelines",
];
```

</details>
