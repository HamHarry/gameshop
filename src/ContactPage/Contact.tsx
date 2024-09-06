import { Controller, useForm } from "react-hook-form";
import "./Contact.css";

interface ContactForm {
  email: string;
  comment: string;
}
const defaultValues: ContactForm = {
  email: "",
  comment: "",
};

const Contact = () => {
  const { handleSubmit, control, reset } = useForm<ContactForm>({
    defaultValues,
  });

  const submit = (value: ContactForm) => {
    const item = {
      ...value,
    };
    console.log(item);
    reset(defaultValues);
  };

  return (
    <div className="warp-container-contact">
      <div className="navbar-contact">
        <h1>Contact</h1>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <div className="send">
          <div className="send-name">
            <p>Email:</p>
            <Controller
              control={control}
              name="email"
              render={({ field }) => {
                return <input {...field} type="text" placeholder="Email..." />;
              }}
            />
          </div>
          <Controller
            control={control}
            name="comment"
            render={({ field }) => {
              return (
                <textarea
                  {...field}
                  placeholder="Enter text here..."
                ></textarea>
              );
            }}
          />
        </div>
        <div className="btn-contact">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
