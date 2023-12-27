import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import axios from "axios";
import Footer from "./Footer";
import Toolbar from "./Toolbar";
import { useEffect, useState } from "react";

type updateData = {
  update: string;
};
type memberData = {
  admin_ssn: number;
};

export default function Updates() {
  const navigate = useNavigate();
  const [options, setOptions] = useState<memberData[]>([]);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:8081/memberadmin/" + localStorage.getItem("userId"))
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((err) => console.log(err));
    console.log(options[0]);
    console.log(localStorage.getItem("userId"));
  }, []);
  if (localStorage.getItem("role") !== "member") {
    navigate("/home");
  }

  const schema: ZodType<updateData> = z.object({
    update: z.string().min(3),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateData>({ resolver: zodResolver(schema) });

  const submitData = (data: updateData) => {
    console.log(data);

    axios
      .post("http://localhost:8081/updates", {
        member: localStorage.getItem("userId"),
        admin: options,
        update: data.update,
      })
      .then((res) => {
        console.log(res);
        alert("Update Sent");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Toolbar />
      {
        <div className="formContainer">
          <div className="big-box">
            <form
              action=""
              className="form1"
              onSubmit={handleSubmit(submitData)}
            >
              <div className="mb-3">
                <label htmlFor="name">
                  <strong>Update</strong>
                </label>
                <div className="box">
                <input type="text"  {...register("update")} />
                  {errors.update && (
                    <span className="error-msg">{errors.update.message}</span>
                  )}
                </div>
              </div>
              <input
                type="submit"
                value="Send Update"
                className="btn btn-warning btn-highlight mb-4 w-100"
              />
            </form>
          </div>
        </div>
      }
      <Footer />
    </div>
  );
}
