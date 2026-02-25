import CreditCardIcon from "@mui/icons-material/CreditCard";
import HomeAppIcon from "@mui/icons-material/Home";
import MoneyIcon from "@mui/icons-material/MoneyOff";
import WalletIcon from "@mui/icons-material/Wallet";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useRouter } from "@tanstack/react-router";
import * as React from "react";

/**
 * Componente principal de navegación inferior (Dock) para la aplicación.
 * Permite la navegación rápida entre las secciones principales: Inicio, Ingresos, Gastos y Deudas.
 *
 * @returns {JSX.Element} El componente BottomNavigation que representa el Dock.
 */
export default function Dock() {
  const router = useRouter();
  const [value, setValue] = React.useState("/");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.navigate({
      to: newValue,
    });
  };

  return (
    <BottomNavigation
      onChange={handleChange}
      sx={{
        width: 500,
      }}
      value={value}
    >
      <BottomNavigationAction icon={<HomeAppIcon />} label="Inicio" value="/" />
      <BottomNavigationAction
        icon={<WalletIcon />}
        label="Ingresos"
        value="/income"
      />
      <BottomNavigationAction
        icon={<MoneyIcon />}
        label="Gastos"
        value="/expenses"
      />
      <BottomNavigationAction
        icon={<CreditCardIcon />}
        label="Deudas"
        value="/debts"
      />
    </BottomNavigation>
  );
}
