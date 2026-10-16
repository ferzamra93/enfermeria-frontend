
import { useEffect, useState, type FormEvent } from "react";
import { authRepository } from "../repositories/authRepository";
import "./AdminPage.css";

type Section = "inicio" | "estudiantes" | "personal" | "inventario";

interface ManagedRecord {
  id: string;
  name: string;
  detail: string;
  allergies: string;
  age?: number;
  active: boolean;
}

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  expiration: string;
}

interface AdminPageProps {
  onLogout: () => void;
}

const STUDENTS_KEY = "admin_students";
const STAFF_KEY = "admin_staff";
const INVENTORY_KEY = "nursing_inventory";

function readStorage<T>(key: string): T[] {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T[]) : [];
  } catch {
    return [];
  }
}

const AdminPage = ({ onLogout }: AdminPageProps) => {
  const [section, setSection] = useState<Section>("inicio");

  const [students, setStudents] = useState<ManagedRecord[]>(() =>
    readStorage<ManagedRecord>(STUDENTS_KEY)
  );

  const [staff, setStaff] = useState<ManagedRecord[]>(() =>
    readStorage<ManagedRecord>(STAFF_KEY)
  );

  const [inventory, setInventory] = useState<InventoryItem[]>(() =>
    readStorage<InventoryItem>(INVENTORY_KEY)
  );

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [allergies, setAllergies] = useState("");
  const [age, setAge] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [expiration, setExpiration] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const currentUser = authRepository.getCurrentUser();

  useEffect(() => {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STAFF_KEY, JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
  }, [inventory]);

  const resetForm = () => {
    setName("");
    setDetail("");
    setAllergies("");
    setAge("");
    setQuantity("1");
    setExpiration("");
    setEditingId(null);
  };

  const handleRecordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !detail.trim()) return;

    const recordData = {
  name: name.trim(),
  detail: detail.trim(),
  allergies:
    section === "estudiantes"
      ? allergies.trim() || "Ninguna registrada"
      : "",
  age: section === "estudiantes" ? Number(age) : undefined,
};

    if (section === "estudiantes") {
      if (editingId) {
        setStudents((current) =>
          current.map((item) =>
            item.id === editingId
              ? { ...item, ...recordData }
              : item
          )
        );
      } else {
        setStudents((current) => [
          ...current,
          {
            id: crypto.randomUUID(),
            ...recordData,
            active: true,
          },
        ]);
      }
    } else {
      if (editingId) {
        setStaff((current) =>
          current.map((item) =>
            item.id === editingId
              ? { ...item, ...recordData }
              : item
          )
        );
      } else {
        setStaff((current) => [
          ...current,
          {
            id: crypto.randomUUID(),
            ...recordData,
            active: true,
          },
        ]);
      }
    }

    resetForm();
  };

  const startEditing = (record: ManagedRecord) => {
    setEditingId(record.id);
    setName(record.name);
    setDetail(record.detail);
    setAllergies(record.allergies || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInventorySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const amount = Number(quantity);

    if (!name.trim() || !Number.isInteger(amount) || amount < 0) return;

    setInventory((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        quantity: amount,
        expiration,
      },
    ]);

    resetForm();
  };

  const toggleRecord = (id: string) => {
    if (section === "estudiantes") {
      setStudents((current) =>
        current.map((item) =>
          item.id === id ? { ...item, active: !item.active } : item
        )
      );
    } else {
      setStaff((current) =>
        current.map((item) =>
          item.id === id ? { ...item, active: !item.active } : item
        )
      );
    }

    if (editingId === id) {
      resetForm();
    }
  };

  const changeStock = (id: string, amount: number) => {
    setInventory((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + amount) }
          : item
      )
    );
  };

  const menu: { id: Section; label: string; icon: string }[] = [
    { id: "inicio", label: "Resumen", icon: "▦" },
    { id: "estudiantes", label: "Estudiantes", icon: "♙" },
    { id: "personal", label: "Personal de enfermería", icon: "✚" },
    { id: "inventario", label: "Inventario", icon: "▤" },
  ];

  const currentRecords = section === "estudiantes" ? students : staff;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-icon">+</span>
          <div>
            <strong>Sistema de Enfermería</strong>
            <small>Administración</small>
          </div>
        </div>

        <p className="admin-menu-title">MENÚ PRINCIPAL</p>

        <nav className="admin-nav">
          {menu.map((item) => (
            <button
              key={item.id}
              type="button"
              className={section === item.id ? "active" : ""}
              onClick={() => {
                setSection(item.id);
                resetForm();
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button className="admin-logout" type="button" onClick={onLogout}>
          ↪ Cerrar sesión
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-eyebrow">PANEL DE ADMINISTRACIÓN</span>
            <h1>{menu.find((item) => item.id === section)?.label}</h1>
          </div>

          <div className="admin-user">
            <span className="admin-avatar">A</span>
            <div>
              <strong>{currentUser?.name ?? "Administrador"}</strong>
              <small>Administrador</small>
            </div>
          </div>
        </header>

        {section === "inicio" && (
          <>
            <section className="admin-welcome">
              <div>
                <span>BIENVENIDO AL SISTEMA</span>
                <h2>Gestión de enfermería</h2>
                <p>
                  Administra estudiantes, personal y existencias desde un solo
                  lugar.
                </p>
              </div>
              <span className="admin-welcome-symbol">✚</span>
            </section>

            <section className="admin-stats">
              <article>
                <span>Estudiantes registrados</span>
                <strong>{students.filter((item) => item.active).length}</strong>
                <small>Registros activos en este panel</small>
              </article>

              <article>
                <span>Personal activo</span>
                <strong>{staff.filter((item) => item.active).length}</strong>
                <small>Cuentas registradas en este panel</small>
              </article>

              <article>
                <span>Productos en inventario</span>
                <strong>{inventory.length}</strong>
                <small>Tipos de productos registrados</small>
              </article>

              <article>
                <span>Existencias bajas</span>
                <strong>
                  {inventory.filter((item) => item.quantity <= 5).length}
                </strong>
                <small>Productos con 5 unidades o menos</small>
              </article>
            </section>

            <section className="admin-panel-card">
              <h2>Accesos rápidos</h2>

              <div className="admin-quick-actions">
                <button
                  type="button"
                  onClick={() => setSection("estudiantes")}
                >
                  <span>♙</span>
                  <strong>Gestionar estudiantes</strong>
                  <small>Registrar, editar y dar de baja</small>
                </button>

                <button type="button" onClick={() => setSection("personal")}>
                  <span>✚</span>
                  <strong>Gestionar personal</strong>
                  <small>Controlar personal activo</small>
                </button>

                <button
                  type="button"
                  onClick={() => setSection("inventario")}
                >
                  <span>▤</span>
                  <strong>Controlar inventario</strong>
                  <small>Registrar productos y existencias</small>
                </button>
              </div>
            </section>
          </>
        )}

        {(section === "estudiantes" || section === "personal") && (
          <section className="admin-panel-card">
            <div className="admin-section-heading">
              <div>
                <h2>
                  {section === "estudiantes"
                    ? "Registro de estudiantes"
                    : "Personal de enfermería"}
                </h2>

                <p>
                  {section === "estudiantes"
                    ? "Registra, edita estudiantes y cambia su estado."
                    : "Registra, edita al personal y administra su estado."}
                </p>
              </div>

              <span className="admin-count">
                {currentRecords.length} registros
              </span>
            </div>

            <form className="admin-form" onSubmit={handleRecordSubmit}>
              <label>
                Nombre completo
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Escribe el nombre completo"
                  required
                />
              </label>
              {section === "estudiantes" && (
              <label>
                Edad
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  placeholder="Edad en años"
                  required
                />
              </label>
)}
              <label>
                {section === "estudiantes"
                  ? "Curso o nivel"
                  : "Carnet de identidad"}
                <input
                  value={detail}
                  onChange={(event) => setDetail(event.target.value)}
                  placeholder={
                    section === "estudiantes"
                      ? "Ej. 5º Secundaria"
                      : "Número de carnet"
                  }
                  required
                />
              </label>

              {section === "estudiantes" && (
                <label>
                  Alergias del estudiante
                  <textarea
                    value={allergies}
                    onChange={(event) => setAllergies(event.target.value)}
                    placeholder="Ej. Alergia a la penicilina o ninguna conocida"
                    rows={2}
                  />
                </label>
              )}

              <div className="admin-form-actions">
                <button className="admin-primary-button" type="submit">
                  {editingId
                    ? "Guardar cambios"
                    : section === "estudiantes"
                      ? "+ Registrar estudiante"
                      : "+ Registrar personal"}
                </button>

                {editingId && (
                  <button
                    className="admin-action-button"
                    type="button"
                    onClick={resetForm}
                  >
                    Cancelar edición
                  </button>
                )}
              </div>
            </form>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>{section === "estudiantes" ? "Curso" : "Carnet"}</th>
                    {section === "estudiantes" && <th>Alergias</th>}
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {currentRecords.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.detail}</td>

                      {section === "estudiantes" && (
                        <td>{item.allergies || "Ninguna registrada"}</td>
                      )}

                      <td>
                        <span
                          className={
                            item.active
                              ? "admin-status active"
                              : "admin-status inactive"
                          }
                        >
                          {item.active ? "Activo" : "Inactivo"}
                        </span>
                      </td>

                      <td>
                        <div className="admin-form-actions">
                          <button
                            className="admin-action-button"
                            type="button"
                            onClick={() => startEditing(item)}
                          >
                            Editar
                          </button>

                          <button
                            className="admin-action-button"
                            type="button"
                            onClick={() => toggleRecord(item.id)}
                          >
                            {item.active ? "Dar de baja" : "Reactivar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {currentRecords.length === 0 && (
                    <tr>
                      <td
                        colSpan={section === "estudiantes" ? 5 : 4}
                        className="admin-empty"
                      >
                        Todavía no hay registros. Utiliza el formulario para
                        agregar el primero.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {section === "inventario" && (
          <section className="admin-panel-card">
            <div className="admin-section-heading">
              <div>
                <h2>Inventario de enfermería</h2>
                <p>
                  Registra productos, controla cantidades y consulta sus fechas
                  de vencimiento.
                </p>
              </div>

              <span className="admin-count">
                {inventory.length} productos
              </span>
            </div>

            <form
              className="admin-form admin-inventory-form"
              onSubmit={handleInventorySubmit}
            >
              <label>
                Nombre del producto
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ej. Gasas estériles"
                  required
                />
              </label>

              <label>
                Cantidad inicial
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  required
                />
              </label>

              <label>
                Fecha de vencimiento
                <input
                  type="date"
                  value={expiration}
                  onChange={(event) => setExpiration(event.target.value)}
                />
              </label>

              <button className="admin-primary-button" type="submit">
                + Agregar producto
              </button>
            </form>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Existencias</th>
                    <th>Vencimiento</th>
                    <th>Actualizar stock</th>
                  </tr>
                </thead>

                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>

                      <td>
                        <span
                          className={
                            item.quantity <= 5
                              ? "admin-status inactive"
                              : "admin-status active"
                          }
                        >
                          {item.quantity} unidades
                        </span>
                      </td>

                      <td>{item.expiration || "No especificado"}</td>

                      <td>
                        <div className="admin-stock-actions">
                          <button
                            type="button"
                            aria-label={`Restar una unidad de ${item.name}`}
                            onClick={() => changeStock(item.id, -1)}
                            disabled={item.quantity === 0}
                          >
                            −
                          </button>

                          <button
                            type="button"
                            aria-label={`Sumar una unidad a ${item.name}`}
                            onClick={() => changeStock(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {inventory.length === 0 && (
                    <tr>
                      <td colSpan={4} className="admin-empty">
                        Todavía no hay productos registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
