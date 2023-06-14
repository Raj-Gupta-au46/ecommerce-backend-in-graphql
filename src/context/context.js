import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

const getUser = async (token) => {
  try {
    if (token) {
      const user = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      return user;
    }
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  } catch (error) {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
};
const context = async ({ req, res }) => {
  try {
    const token = req.headers.authorization || "";
    //console.log(token);
    if (!token)
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });

    const user = await getUser(token);

    if (!user) {
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    } else {
      const admin = user.role === "admin"; // Assuming the user object has a 'role' property
      if (admin) {
        return { user, isAdmin: true };
      } else {
        return { user };
      }
    }
  } catch (error) {
    console.log(error);
    //   throw new GraphQLError(`Error ${error}`, {
    //     extensions: {
    //       code: `ERROR_ ${error}`,
    //       http: { status: 401 },
    //     },
    //   });
  }
};

export default context;

// async function aggregationData({
//   model,
//   args,
//   position = args?.length,
//   sort,
//   per_page,
//   pageNo,
//   isTotalData,
// }) {
//   try {
//     if (sort) {
//       args.splice(position, 0, {
//         $sort: sort,
//       });
//     }

//     if (
//       typeof per_page === "number" &&
//       typeof pageNo === "number" &&
//       per_page > -1 &&
//       pageNo > -1
//     ) {
//       const perPage = per_page;
//       const skip = +perPage * pageNo;

//       const totalCount = isTotalData
//         ? await model.aggregate([
//             ...args,
//             {
//               $count: "totalCount",
//             },
//           ])
//         : undefined;

//       args.splice(position + 1, 0, {
//         $skip: skip,
//       });
//       args.splice(position + 2, 0, {
//         $limit: per_page + 1,
//       });
//       const dataGet = await model.aggregate(args);

//       const haveNextPage = Boolean(dataGet.length === Number(perPage) + 1);
//       if (haveNextPage) {
//         dataGet.pop();
//       }

//       return {
//         results: dataGet,
//         haveNextPage,
//         pageNo: isTotalData ? pageNo : undefined,
//         perPage: isTotalData ? per_page : undefined,
//         totalCount: totalCount?.[0]?.totalCount,
//       };
//     } else {
//       const dataGet = await model.aggregate(args);
//       return {
//         results: dataGet,
//         haveNextPage: false,
//       };
//     }
//   } catch (error) {
//     throw error;
//   }
// }
