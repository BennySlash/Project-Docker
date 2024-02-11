import { useState } from "react";

const Modal = (props) => {
  const toggelModal = () => {
    setModal((prevState) => !prevState);
  };
  return (
    <>
      <div className="flex flex-col bg-stone-950 text-white z-50 items-center justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  md:inset-0 h-[calc(100%-20rem)]">
        <p className="p-40 mx-40 mt-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea deserunt
          repellat repellendus quos culpa quod, error accusantium. Natus
          corrupti et deserunt in dignissimos, nulla reiciendis impedit,
          assumenda totam consequatur dolorem. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Blanditiis, quibusdam nihil, dicta
          dolorem porro maiores numquam amet suscipit id quidem ad eos dolorum
          consequatur laboriosam! Tenetur, nisi! Necessitatibus, nam esse beatae
          aliquam tempore ab ducimus, inventore minus quos consequatur nesciunt
          neque ea quaerat laborum et alias aliquid. Ducimus, minus. Voluptate,
          sint quae molestiae quo dicta et aspernatur omnis eos ipsam veniam
          architecto ipsa suscipit placeat veritatis facere ut eveniet!
          Voluptatum optio provident aut sint illo at sapiente voluptatibus
          aliquam ducimus omnis, ipsum vblackoluptatem itaque debitis
          repellendus. Aliquid nesciunt aliquam expedita?
          {props.explanation}
        </p>
        <button
          onClick={props.toggle}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Next Question
        </button>
      </div>
    </>
  );
};

export default Modal;
