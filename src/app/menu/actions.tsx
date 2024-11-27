'use server'
import { redirect } from 'next/navigation'
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
// import _ from "lodash";

interface IMenu {
  id?: number,
  nombre: string | null,
  precio: number,
  imagen: string
  idCategoria: number,
  descripcion: string
}

export async function createMenu(formData: FormData) {
  // Create a new post
  // ...
  const image = formData.get("imagen") as File || null;

  const buffer = Buffer.from(await image.arrayBuffer());


  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;

  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      // This is for checking the directory is exist (ENOENT : Error No Entry)
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);

    const fileUrl = `${relativeUploadDir}/${filename}`;


    const data: IMenu = {
      nombre: formData.get('nombre') as string,
      precio: parseInt(formData.get('precio') as string),
      imagen: fileUrl,
      idCategoria: 1,
      descripcion: formData.get('descripcion') as string
    }

    const response = await fetch('http://localhost:3000/api/menu', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    // Handle response if necessary
    const responseJson = await response.json()
    // ...
    console.log(responseJson);

  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
  // Redirect to the new post
  redirect(`/menu`)
}

export async function addMenu(idMenu: number) {

  try {
    const data = {
      id_menu: idMenu,
      id_mesa: 1,
      id_empleado: 1,
      id_client: 1
    };
    const response = await fetch('http://localhost:3000/api/menu', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    console.log(response);
  } catch (e) {
    console.error("Error while trying to add Pedido\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}