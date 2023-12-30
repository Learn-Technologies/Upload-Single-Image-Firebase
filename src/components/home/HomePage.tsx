import {
  useAddList,
  useDeleteList,
  useLists,
} from "@/src/components/services/FirebaseApis";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-tailwind/react";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Modal from "../common/Modal";
import Utils from "../services/Utils";
import HomeLists from "./HomeLists";
import TextField from "../common/inputs/TextField";
interface IFormInput {
  firstName: string;
  lastName: string;
  img: string;
}
const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    img: yup.mixed().test("file", "File is required", (value: any) => {
      if (value?.length > 0) return true;
      return false;
    }),
  })
  .required();

export default function HomePage() {
  const addList = useAddList();
  const getLists = useLists();
  const deleteList = useDeleteList();
  const [isEditObj, setEditObj] = React.useState<Object | null>(null);
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const objForm = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: !!isEditObj ? isEditObj : {},
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    console.log(data, "form data");
    const imgUrl = await Utils.storeImgToFirebase(
      data.img[0],
      "myStoreStorage"
    );
    const res = await addList.mutateAsync({ ...data, img: imgUrl });
    window.alert("Data added successfully");
    objForm.reset();
    setModalOpen(false);
    setEditObj(null);
  };
  React.useEffect(() => {
    if (!!isEditObj) objForm.reset(isEditObj);
  }, [!!isEditObj]);

  async function handleDelete(data: any) {
    if (!(await Utils.showAlert())) return;
    await deleteList.mutateAsync(data);
    getLists.refetch();
  }
  return (
    <div className="">
      <div className="flex justify-between items-center mx-10 bg-[#f0f0f0f0]">
        <h1 className="m-10 text-3xl font-semibold">Listing Items</h1>
        <Button
          placeholder=""
          className="m-10"
          onClick={() => setModalOpen(!isModalOpen)}
        >
          Add List
        </Button>
      </div>
      {/* <button onClick={() => Utils.showAlert()}>show alert</button> */}
      <HomeLists
        getLists={getLists}
        setEditObj={setEditObj}
        setModalOpen={setModalOpen}
        handleDelete={handleDelete}
      />

      <Modal
        isModalOpen={isModalOpen}
        header="Add Update Modal"
        setModalOpen={() => {
          setModalOpen(false);
          setEditObj(null);
        }}
        childComponent={
          <>
            <FormProvider {...objForm}>
              <form onSubmit={objForm.handleSubmit(onSubmit)}>
                <div className="">
                  <TextField
                    name="img"
                    componentProps={{
                      type: "file",
                      accept: "image/*",
                    }}
                  />

                  <div className="w-full ">
                    <div className="relative w-full min-w-[200px]">
                      <TextField
                        name="firstName"
                        componentProps={{
                          placeholder: "learnTech",
                        }}
                      />
                      <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                        First Name
                      </label>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="relative w-full min-w-[200px]">
                      <TextField
                        name="lastName"
                        componentProps={{
                          placeholder: "Last Name",
                        }}
                      />
                      <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                        Last Name
                      </label>
                    </div>
                  </div>
                </div>
                <Button placeholder="" className="mt-2" type="submit">
                  Submit
                </Button>
              </form>
            </FormProvider>
          </>
        }
      />
    </div>
  );
}
