import { auth } from "@/auth";
import {
  deleteUserSavedItem,
  getUserSavedItemsCount,
  saveItemToCollection,
} from "@/lib/server-utils";
import { handleError } from "@/lib/utils";
import {
  collectionDeleteRequestSchema,
  collectionPostRequestSchema,
} from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id || "";
  if (!userId) {
    return NextResponse.json(
      { message: "請先登入後再嘗試一次" },
      { status: 401 },
    );
  }
  try {
    let isSuccess;
    //主要為了確保saveItemToCollection成功而且有正確經過所有流程執行
    const result = await request.json();
    const validatedData = collectionPostRequestSchema.safeParse(result);
    if (!validatedData.success) {
      throw new Error(validatedData.error.message);
    }
    const { type, itemId } = validatedData.data;
    if (validatedData.data.type === "release") {
      const count = await getUserSavedItemsCount("userReleases", userId);
      if (count >= 5) {
        throw new Error("願望清單的數量過多，請到清單列表刪除後繼續");
      }
      await saveItemToCollection(type, itemId, userId);
      isSuccess = true;
    } else if (validatedData.data.type === "artist") {
      const count = await getUserSavedItemsCount("userArtists", userId);
      if (count >= 5) {
        throw new Error("清單數量過多，請到刪除部分後繼續");
      }
      await saveItemToCollection(type, itemId, userId);
      isSuccess = true;
    }
    return isSuccess
      ? NextResponse.json(
          { success: true, message: "成功加入收藏" },
          { status: 200 },
        )
      : NextResponse.json(
          { success: false, message: "發生錯誤，請稍後重試" },
          { status: 500 },
        );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: handleError(error) },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id || "";
  if (!userId) {
    return NextResponse.json(
      { message: "請先登入後再嘗試一次" },
      { status: 401 },
    );
  }
  try {
    let isSuccess;
    const result = await request.json();
    const validatedData = collectionDeleteRequestSchema.safeParse(result);
    if (!validatedData.success) {
      throw new Error(validatedData.error.message);
    }
    const { documentId, type } = validatedData.data;
    if (type === "release") {
      await deleteUserSavedItem(type, documentId);
      isSuccess = true;
    } else if (type === "artist") {
      await deleteUserSavedItem(type, documentId);
      isSuccess = true;
    }

    return isSuccess
      ? NextResponse.json(
          { success: true, message: "成功刪除收藏" },
          { status: 200 },
        )
      : NextResponse.json(
          { success: false, message: "發生錯誤，請稍後重試" },
          { status: 500 },
        );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: handleError(error) },
      { status: 500 },
    );
  }
}
