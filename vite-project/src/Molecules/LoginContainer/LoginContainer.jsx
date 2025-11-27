import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";
import ContainerBoard from "../ContainerBoard/ContainerBoard";
import {
  Container,
  LoginTitulo,
} from "../ContainerBoard/ContainerBoard.styles";
import { ContainerFrase, IconeSample } from "./LoginContainer.styles";
import { Stack } from "@mui/material";
import Modal from "../../Molecules/Modal/Modal.jsx";
import FormsEmail from "../../Molecules/Modal/Forms/FormsEmail.jsx";
import FormsEsqueciASenha from "../../Molecules/Modal/Forms/FormsEsqueciASenha.jsx";
import FormsCodigo from "../../Molecules/Modal/Forms/FormsCodigo.jsx";
import { useState, useEffect } from "react";

export default function LoginContainer() {
  // Função para extrair parâmetro da URL
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(param);
    if (param === "token") {
      console.log("[RESET][FRONT] Token encontrado na URL:", value);
    }
    return value;
  }

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(null);
  const [codigo, setCodigo] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [isValidTempo, setIsValidTempo] = useState(false);
  const [id, setId] = useState(null);
  const [codigoValidade, setCodigoValidade] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenValidando, setTokenValidando] = useState(false);

  // Se token na URL, etapaAtual = 1 (validação token), senão segue fluxo normal
  const etapaAtual = token ? (!isValid ? 1 : 2) : !email ? 0 : !isValid ? 1 : 2;
  // Efeito para detectar token na URL ao montar
  useEffect(() => {
    const urlToken = getQueryParam("token");
    if (urlToken) {
      setToken(urlToken);
      setShowModal(true);
      setTokenValidando(true);
      console.log("[RESET][FRONT] Iniciando validação do token:", urlToken);
      // Chamada assíncrona para validar token
      (async () => {
        try {
          const endpoint = `${
            import.meta.env.VITE_ENDERECO_API
          }/usuarios/validarTokenReset?token=${urlToken}`;
          console.log(
            "[RESET][FRONT] Chamando endpoint de validação:",
            endpoint
          );
          const res = await fetch(endpoint);
          const data = await res.json();
          console.log(
            "[RESET][FRONT] Resposta da validação:",
            res.status,
            data
          );
          if (res.ok && data?.id) {
            setId(data.id);
            setIsValid(true); // Pula para etapa de nova senha
            console.log("[RESET][FRONT] Token válido, id do usuário:", data.id);
          } else {
            setIsValid(false);
            console.warn("[RESET][FRONT] Token inválido ou expirado:", data);
          }
        } catch (e) {
          setIsValid(false);
          console.error("[RESET][FRONT] Erro ao validar token:", e);
        } finally {
          setTokenValidando(false);
        }
      })();
    }
  }, []);

  const toggleModal = () => {
    if (showModal) {
      setEmail(null);
      setCodigo(null);
      setIsValid(false);
      setId(null);
      setToken(null);
    }
    setShowModal(!showModal);
  };

  return (
    <Container>
      <ContainerFrase>
        <Stack sx={{ width: "72%", gap: "2rem" }}>
          <IconeSample></IconeSample>
          <LoginTitulo
            sx={{
              fontSize: "150px",
              lineHeight: "120px",
              textDecorationColor: "white",
              textDecoration: "underline",
            }}
          >
            Human consulting
          </LoginTitulo>
          <p style={{ fontSize: "24px", fontWeight: "300" }}>
            Sua ideia, <b>nosso planejamento</b>, e a{" "}
            <b>execução que garante o sucesso</b> do seu <b>projeto</b>.
          </p>
        </Stack>
      </ContainerFrase>

      <ShaderGradientCanvas
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <ShaderGradient
          control="query"
          urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1&cAzimuthAngle=180&cDistance=2.8&cPolarAngle=80&cameraZoom=9.1&color1=%23000047&color2=%2393a2ca&color3=%23212121&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=50&rotationY=0&rotationZ=-60&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.5&uFrequency=0&uSpeed=0.3&uStrength=1.5&uTime=8&wireframe=false"
        />
      </ShaderGradientCanvas>
      <ContainerBoard toggleModal={toggleModal}></ContainerBoard>

      <Modal
        showModal={showModal}
        fechar={toggleModal}
        entidade={"esqueciASenha"}
        form={
          token ? (
            tokenValidando ? (
              <div style={{ padding: 32, textAlign: "center" }}>
                Validando token...
              </div>
            ) : isValid ? (
              <FormsEsqueciASenha
                id={id}
                toggleModal={toggleModal}
                token={token}
                // Log para rastrear passagem do token para o formulário
                debug={() =>
                  console.log(
                    "[RESET][FRONT] Passando token para FormsEsqueciASenha:",
                    token,
                    "id:",
                    id
                  )
                }
              />
            ) : (
              <div style={{ padding: 32, color: "red", textAlign: "center" }}>
                Token inválido ou expirado.
              </div>
            )
          ) : isValid ? (
            <FormsEsqueciASenha id={id} toggleModal={toggleModal} />
          ) : codigo ? (
            <FormsCodigo
              email={email}
              codigo={codigo}
              setCodigo={setCodigo}
              codigoValidade={codigoValidade}
              setCodigoValidade={setCodigoValidade}
              isValidTempo={isValidTempo}
              setIsValidTempo={setIsValidTempo}
              setIsValid={setIsValid}
            />
          ) : (
            <FormsEmail
              setEmail={setEmail}
              setCodigo={setCodigo}
              setId={setId}
              setIsValidTempo={setIsValidTempo}
              setCodigoValidade={setCodigoValidade}
            />
          )
        }
        etapaAtual={etapaAtual}
      />
    </Container>
  );
}
