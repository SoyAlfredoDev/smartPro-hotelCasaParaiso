 <section className="rounded-2xl border border-default bg-surface p-6 shadow-soft">
              <h2 className="mb-5 font-chillax text-xl font-bold text-text-primary">
                ¿Necesitas más espacio?
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {AVAILABLE_ROOMS.map((room) => {
                  const selectedCount =
                    selectedRooms.find((r) => r.id === room.id)?.quantity || 0;
                  return (
                    <motion.div
                      key={room.id}
                      whileHover={{ y: -4 }}
                      className="flex flex-col overflow-hidden rounded-xl border border-default bg-background transition-shadow hover:shadow-md"
                    >
                      <div className="h-28 w-full overflow-hidden">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-4">
                        <div>
                          <h4 className="font-semibold leading-tight text-text-primary">
                            {room.name}
                          </h4>
                          <p className="mt-1 text-sm font-bold text-primary">
                            {formatCurrency(room.price)}
                          </p>
                        </div>
                        <div className="mt-4">
                          {selectedCount > 0 ? (
                            <div className="flex items-center justify-between rounded-lg border border-primary bg-primary/5 px-2 py-1">
                              <button
                                onClick={() =>
                                  handleRoomQuantity(
                                    selectedRooms.findIndex(
                                      (r) => r.id === room.id,
                                    ),
                                    -1,
                                  )
                                }
                                className="flex h-7 w-7 items-center justify-center rounded bg-white shadow-sm text-text-secondary transition-colors hover:text-primary"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="font-bold text-primary">
                                {selectedCount}
                              </span>
                              <button
                                onClick={() =>
                                  handleRoomQuantity(
                                    selectedRooms.findIndex(
                                      (r) => r.id === room.id,
                                    ),
                                    1,
                                  )
                                }
                                className="flex h-7 w-7 items-center justify-center rounded bg-white shadow-sm text-text-secondary transition-colors hover:text-primary"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addRoom(room)}
                              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-default bg-white py-2 text-sm font-semibold text-text-primary shadow-sm transition-colors hover:border-primary hover:text-primary"
                            >
                              <Plus className="h-4 w-4" />
                              Añadir unidad
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>









 <section className="rounded-2xl border border-default bg-surface p-6 shadow-soft">
              <h2 className="mb-5 font-chillax text-xl font-bold text-text-primary">
                Personaliza tu experiencia
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleService(service.id)}
                    className={`flex cursor-pointer flex-col justify-between rounded-xl border p-4 transition-all duration-200 ${
                      service.selected
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-default bg-background hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                          service.selected
                            ? "bg-primary text-white"
                            : "bg-white text-text-secondary shadow-sm"
                        }`}
                      >
                        {service.icon}
                      </div>
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                          service.selected
                            ? "border-primary bg-primary"
                            : "border-default"
                        }`}
                      >
                        {service.selected && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4
                        className={`text-sm font-bold ${service.selected ? "text-primary-dark" : "text-text-primary"}`}
                      >
                        {service.name}
                      </h4>
                      <p className="mt-0.5 text-sm font-medium text-text-secondary">
                        +{formatCurrency(service.price)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>




---------------------