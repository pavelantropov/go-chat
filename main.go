package main

import (
	"flag"
	"log"
	"net/http"
)

func main() {
	var addr = flag.String("addr", ":8080", "App address")
	flag.Parse()
	r := newRoom()

	http.Handle("/room", r)

	go r.run()

	log.Println("Starting web server on", *addr)

	if err := http.ListenAndServe(*addr, nil); err != nil {
		log.Fatalln("ListenAndServe:", err)
		return
	}
}
