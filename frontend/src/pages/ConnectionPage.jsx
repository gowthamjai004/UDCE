import { useNavigate } from "react-router-dom";
import ConnectionForm from "../components/connection/ConnectionForm";
import { connectDatabase } from "../services/api";

function ConnectionPage() {

  const navigate = useNavigate();

  const handleConnect = async (connection) => {

    try {

      const result = await connectDatabase(connection);

      if (result.status === "success") {

        // Save connection
        localStorage.setItem(
          "udce_connection",
          JSON.stringify(connection)
        );

        alert("Connected Successfully");

        navigate("/dashboard");

      } else {

        alert(result.message);

      }

    } catch (error) {

      console.error(error);

      alert("Connection Failed");

    }

  };

  return (
    <ConnectionForm onConnect={handleConnect} />
  );

}

export default ConnectionPage;