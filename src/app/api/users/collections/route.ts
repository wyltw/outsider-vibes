import { auth } from "@/auth";
import { saveItemToCollection } from "@/lib/server-utils";
import { collectionResponseSchema } from "@/lib/validations";
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
    const validatedData = collectionResponseSchema.safeParse(result);
    if (!validatedData.success) {
      throw new Error(validatedData.error.message);
    }
    const { type, itemId } = validatedData.data;
    if (validatedData.data.type === "release") {
      await saveItemToCollection(type, itemId, userId);
      isSuccess = true;
    } else if (validatedData.data.type === "artist") {
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
      { success: false, message: "發生錯誤，請稍後重試" },
      { status: 500 },
    );
  }
}
